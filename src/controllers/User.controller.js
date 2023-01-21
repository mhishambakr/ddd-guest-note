const { User } = require('../models');

const registerUser = async (req, res) => {
    try {
        let { name, email } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Please upload a photo!" });
        }

        let user = await User.create({
            name,
            email,
            profilePicture: `${req.file.originalname}`
        })

        res.status(200).json({
            message: 'User created successfully',
            message2: "Uploaded the file successfully: " + req.file.originalname,
        });
    } catch (err) {
        res.status(500).json({
            message: `error: ${err}`,
        });
    }
};

module.exports = {
    registerUser
}