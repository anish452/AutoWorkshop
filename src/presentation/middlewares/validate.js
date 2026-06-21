const { ValidationError } = require('../../shared/errors/AppError');

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) {
    const errors = result.error.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return next(new ValidationError('Validation failed', errors));
  }

  const { body, query, params } = result.data;
  if (body) req.body = body;
  if (query) req.query = query;
  if (params) req.params = params;
  next();
};

module.exports = validate;
