const Joi = require('joi');

const createNoteValidation = Joi.object({
    typeName: Joi.string().required().messages({
        'string.base': 'Please enter a valid note type',
        'string.empty': 'Please enter note type',
        'any.required': 'Please enter note type'
    }),
    title: Joi.string().required().messages({
        'string.base': 'Please enter a valid note title',
        'string.empty': 'Please enter note title',
        'any.required': 'Please enter note title'
    }),
    body: Joi.string().required().messages({
        'string.base': 'Please enter a valid note body',
        'string.empty': 'Please enter note body',
        'any.required': 'Please enter note body'
    }),
    userId: Joi.number().required().messages({
        'number.base': 'Bad request',
        'any.required': 'Please select a user'
    }),
})

const getNotesValidation = Joi.object({
    userId: Joi.number().required().messages({
        'number.base': 'Bad request',
        'any.required': 'Please select a user'
    }),
    types: Joi.array().items(Joi.number()).messages({
        'array.base': 'types must be array of integers',
    }),
})

const deleteNotesValidation = Joi.object({
    notes: Joi.array().items(Joi.number()).required().messages({
        'array.base': 'notes must be array of integers',
    }),
})

module.exports = {
    createNoteValidation,
    getNotesValidation,
    deleteNotesValidation
}