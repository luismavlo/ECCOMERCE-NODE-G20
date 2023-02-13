const { validationResult } = require('express-validator');


/* A middleware function that checks if the request body has any errors. If there are errors, it
returns a 400 status code with the errors. If there are no errors, it calls the next middleware
function. */
exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};
