import nodemailer from "nodemailer";
import path from "path";
require("dotenv").config();
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

const transporter = nodemailer.createTransport({
  host: "smtp.recurup.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMailRegister = async (data) => {
  const content = {
    from: '"SmartRent" <chungtrinh2k2@gmail.com>',
    to: data.to,
    subject: "Đăng ký tài khoản Smart Rent",
    html: await readFile(
      path.join(__dirname, "../templates/register.html"),
      "utf8"
    ),
  };

  await transporter.sendMail(content);
};

module.exports = {
  sendMailRegister: sendMailRegister,
};
