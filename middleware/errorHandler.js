module.exports = (err, req, res, next) => {
  // Log l'erreur pour le développement
  console.error(err.stack);

  // Préparer la réponse en fonction de l'environnement
  const response = {
    message: err.message || 'Server error',
  };

  // En environnement de développement, inclure la stack de l'erreur
  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  res.status(err.status || 500).json(response);
};
