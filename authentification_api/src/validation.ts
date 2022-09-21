//Validation
const Joi = require("joi");

//Validation pour l'inscription
const registerValidation = (data: any) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role_id: Joi.number().integer().required().min(1).max(5),
    birthdate: Joi.date().allow(null, ""),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    mobile: Joi.number().integer().required(),
    address: Joi.string().allow(null, ""),
    city: Joi.string().allow(null, ""),
    zipCode: Joi.number().integer().allow(null, ""),
    emailParrain: Joi.string().allow(null, ""),
  });
  return schema.validate(data);
};

//Validation pour la connexion
const loginValidation = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

const infoValidation = (data: any) => {
  const schema = Joi.object({
    id: Joi.number().id().required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.infoValidation = infoValidation;
