const express = require('express');
const router = express.Router();
const Contact = require('../Models/Contact');
const nodemailer = require('nodemailer');

router.post('/send-message',async(req,res)=>{
    const { name, email, subject, message } = req.body;

    try{
        const contact = new Contact({name, email, subject, message});
        await contact.save();

        //mail....
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER, // your email
              pass: process.env.EMAIL_PASS, // app password
            },
          });

          const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New Contact Message: ${subject}`,
            text: `From: ${name} <${email}>\n\nMessage:\n${message}`,
          };
          await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent and saved successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending message.' });
  }
}
        
);

module.exports = router;
