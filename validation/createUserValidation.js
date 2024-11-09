const Joi = require("joi");

const createUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    "string.min": "First name must be at least 2 characters long.",
    "string.max": "First name must be at most 50 characters long.",
    "any.required": "First name is required.",
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    "string.min": "Last name must be at least 2 characters long.",
    "string.max": "Last name must be at most 50 characters long.",
    "any.required": "Last name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "A valid email address is required.",
    "any.required": "Email is required.",
  }),
  dateOfBirth: Joi.date().iso().required().messages({
    "date.format": "Date of birth must be in YYYY-MM-DD format.",
    "any.required": "Date of birth is required.",
  }),
  personalIdDocument: Joi.object({
    documentId: Joi.string().min(5).max(20).required().messages({
      "string.min": "documentId must be at least 5 characters long.",
      "string.max": "documentId must be at most 20 characters long.",
      "any.required": "documentId is required.",
    }),
    countryOfIssue: Joi.string()
      .pattern(/^[A-Z]{2}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Country of issue must be a valid ISO 3166-1 alpha-2 code.",
        "any.required": "Country of issue is required.",
      }),
    validUntil: Joi.date().iso().required().messages({
      "date.format": "Valid until date must be in YYYY-MM-DD format.",
      "any.required": "Valid until date is required.",
    }),
  })
    .required()
    .messages({
      "any.required": "personalIdDocument is required.",
    }),
});

module.exports = createUserSchema;