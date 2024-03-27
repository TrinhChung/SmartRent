import express from "express";
import bodyParser from "body-parser";
import { router } from "../route";
import connectDB from "../config/connectDB";
import cors from "cors";
import { eventSocket } from "../controllers/socket";
import { connectRedis } from "../config/connectRedis";
import { checkRoomPermissionSocket } from "../route/socket";
require("dotenv").config();
const path = require("path");

export const createServer = () => {
  const app = express();

  const server = require("http").createServer(app);
  global.io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  app.use(cors({ origin: true }));
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
  });

  var dir = path.resolve("./media");
  app.use(express.static(dir));

  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ limit: "10mb" }));

  app.use("/api", router);

  io.use(checkRoomPermissionSocket);
  io.on("connection", eventSocket);

  return server;
};
