const Joi = require ("joi");

//create validation

const createValidation = (data) => {
    const studentSchema = Joi.object({
        npm : Joi.number().required(),
        nama : Joi.string().required(),
        jurusan : Joi.string().required(),
    });

    return studentSchema.validate(data);

};

const loginValidation = (data) => {
    const userSchema = Joi.object({
        user : Joi.string().required(),
        email : Joi.string().required(),
        password : Joi.string().required(),
    });

    return userSchema.validate(data);

};

module.exports = {
    createValidation,
    loginValidation,
};


