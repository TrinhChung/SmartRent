import express from "express";
import bodyParser from "body-parser";
import { router } from "./route";
import connectDB from "./config/connectDB";
import cors from "cors";
import { eventSocket } from "./controllers/socket";
import { checkRoomPermissionSocket } from "./route/socket";

require("dotenv").config();

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

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb" }));

connectDB();

app.use("/api", router);

let port = process.env.PORT || 8080;

// io.use(checkRoomPermissionSocket);
io.on("connection", eventSocket);

server.listen(port, () => {
  console.log("listening on port: " + port);
});
