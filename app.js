require('dotenv').config();
var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

// Intégration de Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var app = express();

// Middleware de sécurité
app.use(helmet());
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Express avec Swagger',
      version: '1.0.0',
      description: 'Documentation de l’API générée avec Swagger',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
      {
        url: 'https://noohra-backend.vercel.app',
      },
    ],
  },
  // Chemin vers les fichiers contenant les annotations Swagger
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Définition des routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/assessments', require('./routes/assessment'));
app.use('/api/assessment-questions', require('./routes/assessmentQuestion'));
app.use('/api/assessment-responses', require('./routes/assessmentResponse'));
app.use('/api/assessment-results', require('./routes/assessmentResult'));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Middleware centralisé de gestion des erreurs
app.use(require('./middleware/errorHandler'));

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connecté');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
  })
  .catch((err) => console.error(err));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Gestion des erreurs
app.use(function (err, req, res, next) {
  // Fournir les détails de l'erreur en développement
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renvoyer la page d'erreur
  res.status(err.status || 500);
  res.status(err.status || 500).json({ message: err.message });
});

// Démarrage du serveur en local
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
}

module.exports = app;
