function notFoundHandler(req, res) {
  return res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'The requested route was not found.',
      field: null
    }
  });
}

function errorHandler(error, req, res, next) {
  console.error(error);
  return res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An internal server error occurred.',
      field: null
    }
  });
}

module.exports = { notFoundHandler, errorHandler };
