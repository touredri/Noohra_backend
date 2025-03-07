const User = require('../models/User');

// Obtenir tous les utilisateurs
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// Obtenir un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// Mettre à jour un utilisateur par ID
exports.updateUser = async (req, res) => {
  const {
    name,
    email,
    userType,
    age,
    gender,
    diagnosis,
    parentReference,
    phone,
    associatedLearners,
    qualification,
    licenseNumber,
    specialization
  } = req.body;

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé' });
    }
    // Mise à jour des champs communs
    if (name) user.name = name;
    if (email) user.email = email;
    if (userType) user.userType = userType;

    // Mise à jour des champs spécifiques en fonction du type d'utilisateur
    if (userType === 'Learner') {
      if (age !== undefined) user.age = age;
      if (gender) user.gender = gender;
      if (diagnosis) user.diagnosis = diagnosis;
      if (parentReference) user.parentReference = parentReference;
    } else if (userType === 'Parent') {
      if (phone) user.phone = phone;
      if (associatedLearners) user.associatedLearners = associatedLearners;
    } else if (userType === 'Therapist') {
      if (qualification) user.qualification = qualification;
      if (licenseNumber) user.licenseNumber = licenseNumber;
      if (specialization) user.specialization = specialization;
      if (associatedLearners) user.therapistLearners = associatedLearners;
    }

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// Supprimer un utilisateur par ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé' });
    }
    res.json({ msg: 'Utilisateur supprimé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};
