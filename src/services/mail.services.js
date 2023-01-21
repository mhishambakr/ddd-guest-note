const nodemailer = require("nodemailer");


exports.sendEmail = async (mailOptions) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.NODEMAILER_SENDER_MAIL,
            pass: process.env.NODEMAILER_SENDER_PASS
        }
    });

    await transporter.sendMail(mailOptions, function (error, data) {
        if (!error) {
            console.log(`Email is sent successfully to ${mailOptions.to}`);
        }
        else {
            console.log(`Email is not sent to ${mailOptions.to}`);
            console.log(error.message)
        }
    });
}