import nodemailer from "nodemailer";
import config from "../config/index.js";

const sendEmail = async function (email, otp) {
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
        html: `<p> please copy the link and reset your password and otp is ${otp} and please don't share to another one`,
      },
      function (error, infor) {
        if (error) {
        } else {
          console.log("mail has been sent", infor.response);
        }
      }
    );
  } catch (err) {
    console.log(err, "mail not sent");
  }
};

export default sendEmail;
