const AssessmentProgress = require('../models/AssessmentProgress');

exports.saveAssessmentProgress = async (req, res) => {
  try {
    const { userId, assessmentId, progress, lastQuestion } = req.body;
    if (!userId || !assessmentId || progress === undefined) {
      return res.status(400).json({ error: 'userId, assessmentId et progress sont obligatoires.' });
    }

    const filter = { userId, assessmentId };
    const update = {
      progress,
      lastQuestion,
      updatedAt: new Date(),
      // En cas d'insertion, on définit startedAt automatiquement
      $setOnInsert: { startedAt: new Date() },
    };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const result = await AssessmentProgress.findOneAndUpdate(filter, update, options);
    return res.status(200).json({ message: 'Progression sauvegardée', data: result });
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la progression:", error);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};
