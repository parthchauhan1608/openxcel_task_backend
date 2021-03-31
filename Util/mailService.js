const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

function sendMail(email, subject, html) {
    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions)
        .then(() => {
            console.log("main send success response.")
        })
        .catch((e) => {
            console.log({ e });
        });
}

module.exports = {
    sendMail
}