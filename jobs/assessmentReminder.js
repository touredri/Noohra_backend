const cron = require('node-cron');
const nodemailer = require('nodemailer');
const AssessmentProgress = require('../models/AssessmentProgress');
const User = require('../models/User');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP configuration error:', error);
  } else {
    console.log('SMTP configuration is correct:', success);
  }
});

// Planification de la tâche tous les jours à minuit
cron.schedule('0 0 * * *', async () => {
  try {
    // Sélection des assessments incomplets datant de plus de 24 heures
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const incompleteAssessments = await AssessmentProgress.find({
      progress: { $lt: 100 },
      startedAt: { $lt: twentyFourHoursAgo },
    }).populate('userId');

    for (const assessment of incompleteAssessments) {
      const user = assessment.userId;
      if (!user || !user.email) continue;

      const resumeLink = `https://noohra-backend.vercel.app/api/assessment/${assessment.assessmentId}/resume?user=${user._id}`;
      const mailOptions = {
        from: '"Assessment Team" <no-reply@votreapp.com>',
        to: user.email,
        subject: 'Complétez votre assessment en cours',
        text: `Bonjour ${user.firstName},

Vous avez un assessment en cours avec une progression de ${assessment.progress}%.
Cliquez sur le lien ci-dessous pour reprendre :
${resumeLink}

Cordialement,
L'équipe Assessment`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email envoyé à ${user.email}`);
      } catch (mailErr) {
        console.error(
          `Erreur lors de l'envoi de l'email à ${user.email}:`,
          mailErr
        );
      }
    }
  } catch (err) {
    console.error("Erreur lors de l'exécution de la tâche de rappel:", err);
  }
});
