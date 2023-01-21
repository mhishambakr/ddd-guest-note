const util = require('util');
const multer = require('multer');

const maxSize = 1.7 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + `/resources/uploads/${req.params.dist}`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

uploadFile = util.promisify(uploadFile);

let uploadMultipleFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).array("files");

uploadMultipleFile = util.promisify(uploadMultipleFile);

module.exports = {uploadFile,uploadMultipleFile};