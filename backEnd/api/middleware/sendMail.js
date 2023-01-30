import nodemailer from "nodemailer";
import config from "../config/index.js";

const sendEmail = async function (email, userId, token) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.user,
        pass: "djtyamxtkjuqqjdh",
      },
    });
    await transporter.sendMail(
      {
        from: config.user,
        to: email,
        subject: "For reset Password",
        html: `<p> please copy the link and reset your password <a href="http://localhost:3000/user/resetPassword?id=${userId}&token=${token}">reset your password</a>`,
      },
      function (error, infor) {
        if (error) {
          console.log(error);
        } else {
          console.log("mail has been sent", infor.response);
        }
      }
    );
    console.log("mail.send successfully");
  } catch (err) {
    console.log(err, "mail not sent");
  }
};

export default sendEmail;