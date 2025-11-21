const nodemailer = require('nodemailer');

const sendEmailAlert = async ({ to, subject="", text }) => {
    console.log("trying to send mail ", to , subject ,text);
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
      user: process.env.SENDINBLUE_USERNAME,  
      pass: process.env.SENDINBLUE_SMTP_KEY  
    }
  });

  await transporter.sendMail({
    from: `${process.env.ALERT_EMAIL}`,
    to,
    subject,
    text
  });
  console.log("mail sent");
};

module.exports = sendEmailAlert;
