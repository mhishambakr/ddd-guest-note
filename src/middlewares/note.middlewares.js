const { User, Note, NoteFile, NoteType } = require('../models');

const { createNoteValidation, getNotesValidation, deleteNotesValidation } = require('../validations/Note.validations');

const { uploadMultipleFile } = require('./upload');


const uploadNotePhotos = async (req, res, next) => {
    try {
        req.params.dist = 'notes';

        await uploadMultipleFile(req, res);

        next()
    } catch (err) {
        console.log(err.code);
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(422).json({
                message: "File size cannot be larger than 1.7MB!",
            });
        }

        res.status(err.status || 500).json({
            message: `Could not upload the files: ${err}`,
        });
    }
}

const validateNote = async (req, res, next) => {
    try {
        let { type: typeName, title, body, userId } = req.body;

        let valid = await createNoteValidation.validateAsync({ typeName, title, body, userId });

        let user = await User.findOne({
            where: { id: userId }
        })

        if (!user) {
            throw {
                status: 404,
                message: 'User doesn\'t exist!'
            }
        }

        let type = await NoteType.findOne({
            where: { name: typeName }
        })

        if (!type) {
            throw {
                status: 404,
                message: 'Wrong note type!'
            }
        }

        res.locals = {
            user, type
        }

        next()
    } catch (err) {
        res.status(err.status || 422).json({
            message: err.message || 'Something went wrong',
        });
    }
}


const validateGetUserNotes = async (req, res, next) => {
    try {
        let { userId, types } = req.query;

        let valid = await getNotesValidation.validateAsync({ userId, types });

        let user = await User.findOne({
            where: { id: userId }
        })

        if (!user) {
            throw {
                status: 404,
                message: 'User doesn\'t exist!'
            }
        }

        res.locals.user = user;

        next()
    } catch (err) {
        res.status(err.status || 422).json({
            message: err.message || 'Something went wrong',
        });
    }
}


const validateDeleteUserNotes = async (req, res, next) => {
    try {
        let { notes } = req.query;

        let valid = await deleteNotesValidation.validateAsync({ notes });

        next()
    } catch (err) {
        res.status(err.status || 422).json({
            message: err.message || 'Something went wrong',
        });
    }
}

module.exports = {
    uploadNotePhotos,
    validateNote,
    validateGetUserNotes,
    validateDeleteUserNotes
}