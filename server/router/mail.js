const bodyParser = require("body-parser").urlencoded({extended:true}); 
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/sendtomail",bodyParser,async(req,res)=>{
    let transporter = nodemailer.createTransport({
           host: "smtp.mail.ru",
           port: 465,
           secure: true, 
           auth: {
           user: "lessonin@mail.ru",
           pass:  "aDaR3Y8$triO"
           },
         });
     await transporter.sendMail({
           from: '"Fred Foo 👻"<lessonin@mail.ru>', 
           to: 'lessonin@mail.ru', 
           subject: "Order", 
           html: `<b>${req.body.username}</b>
           <b>${req.body.adress}</b>
           <b>${req.body.contact}</b>
           `, 
         });     

         
})

module.exports = router