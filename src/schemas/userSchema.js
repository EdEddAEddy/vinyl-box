import joi from "joi";

export const schemaCreateUser = joi.object({
  username: joi.string().required().messages({
    "any.required": "username field is required",
    "string.empty": "username field is required",
  }),

  email: joi.string().email().required().messages({
    "string.email": "Email field invalid format",
    "any.required": "Email field is required",
    "string.empty": "Email field is required",
  }),

  password: joi.string().required().messages({
    "any.required": "password field is required",
    "string.empty": "password field is required",
  }),
});

export const schemaUserLogin = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Email field invalid format",
    "any.required": "Email field is required",
    "string.empty": "Email field is required",
  }),

  password: joi.string().required().messages({
    "any.required": "password field is required",
    "string.empty": "password field is required",
  }),
});

export const schemaUpdateUser = joi
  .object({
    username: joi.string().messages({
      "string.empty": "username field is required",
    }),
    email: joi.string().email().messages({
      "string.email": "Email field invalid format",
      "string.empty": "Email field is required",
    }),
    password: joi.string().messages({
      "string.empty": "password field is required",
    }),
    cover_url: joi.string().messages({
      "string.empty": "password field is required",
    }),
  })
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for updating.",
  });

export const schemaUserId = joi.object({
  user_id: joi.number().required(),
});
