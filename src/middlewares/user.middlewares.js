const { User, Note, NoteFile, NoteType } = require('../models');

const { registerUserValidation } = require('../validations/User.validations');

const { uploadFile } = require('./upload');


const uploadUserPhoto = async (req, res, next) => {
    try {
        req.params.dist = 'avatars';

        await uploadFile(req, res);

        next()
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(422).json({
                message: "File size cannot be larger than 1.7MB!",
            });
        }

        res.status(err.status || 500).json({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
}

const validateUserInput = async (req, res, next) => {
    try {
        let { name, email } = req.body;

        let valid = await registerUserValidation.validateAsync({ name, email });

        next()
    } catch (err) {
        res.status(err.status || 422).json({
            message: err.message || 'Something went wrong',
        });
    }
}

module.exports = {
    uploadUserPhoto,
    validateUserInput
}
