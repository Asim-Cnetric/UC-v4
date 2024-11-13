const Joi = require("joi");

const registrationSchema = Joi.object({
    full_name: Joi.string().required(),
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phone_number: Joi.string().required(),
    is_active: Joi.bool().default(true),
  });

const loginSchema = Joi.object({
    username: Joi.string().required(), // Can be either email or username
    password: Joi.string().min(8).required(),
  });

module.exports = {
    registrationSchema,
    loginSchema,
};