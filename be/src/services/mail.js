import nodemailer from "nodemailer";
import handlebars from "handlebars";
import path from "path";
require("dotenv").config();
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const buildHtmlSend = async ({ pathHtml, data }) => {
  const html = await readFile(path.join(__dirname, pathHtml), "utf8");
  const template = handlebars.compile(html);
  const htmlToSend = template(data);
  return htmlToSend;
};

const sendMailRegister = async (data) => {
  const content = {
    from: '"SmartRent" <chungtrinh2k2@gmail.com>',
    to: data.email,
    subject: "Đăng ký tài khoản Smart Rent",
    html: await buildHtmlSend({
      pathHtml: "../templates/register.hbs",
      data: data,
    }),
  };
  try {
    await transporter.sendMail(content);
  } catch (error) {
    console.log(error);
    throw new Error("Send Mail Error");
  }
};

module.exports = {
  sendMailRegister: sendMailRegister,
};
