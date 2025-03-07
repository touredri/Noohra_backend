const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  // Validation des champs avec express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { name, email, password, userType, age, gender, diagnosis, parentReference, phone, associatedLearners, qualification, licenseNumber, specialization } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Utilisateur déjà existant' });
    }
    
    user = new User({ name, email, password, userType });
    
    // Ajout des champs en fonction du type d'utilisateur
    if (userType === 'Learner') {
      user.age = age;
      user.gender = gender;
      user.diagnosis = diagnosis;
      user.parentReference = parentReference;
    } else if (userType === 'Parent') {
      user.phone = phone;
      user.associatedLearners = associatedLearners;
    } else if (userType === 'Therapist') {
      user.qualification = qualification;
      user.licenseNumber = licenseNumber;
      user.specialization = specialization;
      user.therapistLearners = associatedLearners;
    }
    
    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();
    
    // Génération du token JWT
    const payload = { user: { id: user.id, userType: user.userType } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Identifiants invalides' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Identifiants invalides' });
    }
    
    // Mise à jour de la dernière connexion
    user.lastLogin = Date.now();
    await user.save();
    
    const payload = { user: { id: user.id, userType: user.userType } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};
