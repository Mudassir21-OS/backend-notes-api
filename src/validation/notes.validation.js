const allowedFields = ['title', 'content'];

function validationError(message, field) {
  return {
    error: {
      code: 'VALIDATION_ERROR',
      message,
      field
    }
  };
}

function hasUnknownFields(body) {
  return Object.keys(body).find((key) => !allowedFields.includes(key));
}

function validateTitle(title) {
  if (title === undefined || title === null) {
    return validationError('Title is required.', 'title');
  }

  if (typeof title !== 'string') {
    return validationError('Title must be a string.', 'title');
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length < 3) {
    return validationError('Title must be at least 3 characters.', 'title');
  }

  if (trimmedTitle.length > 100) {
    return validationError('Title must not exceed 100 characters.', 'title');
  }

  return null;
}

function validateContent(content) {
  if (content === undefined || content === null) {
    return validationError('Content is required.', 'content');
  }

  if (typeof content !== 'string') {
    return validationError('Content must be a string.', 'content');
  }

  const trimmedContent = content.trim();

  if (trimmedContent.length < 10) {
    return validationError('Content must be at least 10 characters.', 'content');
  }

  if (trimmedContent.length > 5000) {
    return validationError('Content must not exceed 5000 characters.', 'content');
  }

  return null;
}

function validateCreateNote(req, res, next) {
  const unknownField = hasUnknownFields(req.body);

  if (unknownField) {
    return res.status(400).json(validationError(`Unknown field '${unknownField}' is not allowed.`, unknownField));
  }

  const titleError = validateTitle(req.body.title);
  if (titleError) {
    return res.status(400).json(titleError);
  }

  const contentError = validateContent(req.body.content);
  if (contentError) {
    return res.status(400).json(contentError);
  }

  req.validatedNote = {
    title: req.body.title.trim(),
    content: req.body.content.trim()
  };

  return next();
}

function validateUpdateNote(req, res, next) {
  const unknownField = hasUnknownFields(req.body);

  if (unknownField) {
    return res.status(400).json(validationError(`Unknown field '${unknownField}' is not allowed.`, unknownField));
  }

  const titleError = validateTitle(req.body.title);
  if (titleError) {
    return res.status(400).json(titleError);
  }

  const contentError = validateContent(req.body.content);
  if (contentError) {
    return res.status(400).json(contentError);
  }

  req.validatedNote = {
    title: req.body.title.trim(),
    content: req.body.content.trim()
  };

  return next();
}

function validateNoteId(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json(validationError('Note ID must be a positive integer.', 'id'));
  }

  req.noteId = id;
  return next();
}

module.exports = {
  validateCreateNote,
  validateUpdateNote,
  validateNoteId,
  validationError
};
