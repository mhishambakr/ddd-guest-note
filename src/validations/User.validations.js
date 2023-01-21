const Joi = require('joi');

const registerUserValidation = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Please enter a valid name',
        'string.empty': 'Please enter your name',
        'any.required': 'Please enter your name'
    }),

    email: Joi.string().email().required().messages({
        'string.base': 'Please enter a valid email',
        'string.email': 'Please enter a valid email',
        'string.empty': 'Please enter your email',
        'any.required': 'Please enter your email'
    }),
})

module.exports = {
    registerUserValidation
}