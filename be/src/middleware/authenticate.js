import jwt from "jsonwebtoken";
import db from "../models/index";
require("dotenv").config();

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = String(req.headers["authorization"] || "");
    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7, authHeader.length);
      let payloadToken = jwt.verify(token, process.env.JWT_SECRET);
      let user = await db.User.findOne({
        where: { id: payloadToken.id },
        attributes: {
          exclude: ["password", "updatedAt", "createdAt"],
        },
      });
      if (user) {
        user = user.get({ plain: true });
        req.user = user;
        next();
      } else {
        res.status(401).json("failed to find user ");
      }
    } else {
      res.status(401).json("failed to find user ");
    }
  } catch (err) {
    console.error(err);
    res.status(401).json("User not allow");
  }
};