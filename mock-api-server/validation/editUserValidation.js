const Joi = require("joi");

const editUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).messages({
    "string.min": "firstName must be at least 2 characters long.",
    "string.max": "firstName must be at most 50 characters long.",
  }),
  lastName: Joi.string().min(2).max(50).messages({
    "string.min": "lastName must be at least 2 characters long.",
    "string.max": "lastName must be at most 50 characters long.",
  }),
  email: Joi.string().email().messages({
    "string.email": "A valid email address is required.",
    "any.required": "email is required.",
  }),
  dateOfBirth: Joi.date().iso().messages({
    "date.format": "dateOfBirth must be in YYYY-MM-DD format.",
    "any.required": "dateOfBirth is required.",
  }),
  personalIdDocument: Joi.object({
    documentId: Joi.string().min(5).max(20).messages({
      "string.min": "documentId must be at least 5 characters long.",
      "string.max": "documentId must be at most 20 characters long.",
    }),
    countryOfIssue: Joi.string()
      .pattern(/^[A-Z]{2}$/)
      .messages({
        "string.pattern.base":
          "countryOfIssue must be a valid ISO 3166-1 alpha-2 code.",
      }),
    validUntil: Joi.date().iso().messages({
      "date.format": "validUntil date must be in YYYY-MM-DD format.",
    }),
  }).messages({
    "any.required": "personalIdDocument is required.",
  }),
});

module.exports = {
  editUserSchema,
};
