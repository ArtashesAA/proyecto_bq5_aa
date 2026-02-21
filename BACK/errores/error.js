// Error not found
function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found", req.originalUrl);
  next(error);
}

// Error general
function errorHandler(err, req, res, next) {
  // Error de conexión Oracle
  if (err.message && err.message.includes("ORA-")) {
    return res.status(500).json({
      message: "Error de conexión con la base de datos.",
    });
  }

  // Error general
  res.status(res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);

  res.json({
    message: err.message || "Error interno del servidor",
  });
}

module.exports = {
  notFound,
  errorHandler,
};
