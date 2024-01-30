import { client } from "../config/connectRedis";
import db from "../models/index";
const path = require("path");
const fs = require("fs");

export const createFileService = async (data) => {
  const messageId = data.messageId;

  for (var file of data.files) {
    var typeFile = file.name.split(".");
    var fileName = new Date().getTime().toString() + file?.name;
    const pathWrite = path.join(path.resolve("./media/"), fileName);
    typeFile = typeFile[typeFile.length - 1];

    const imgBase64 = await client.get(file?.key);
    if (!imgBase64) {
      throw new Error("File isn't not existing");
    }

    fs.writeFileSync(pathWrite, imgBase64, { encoding: "base64" });
    const fileEntity = await db.File.create({
      typeFk: "1",
      fkId: messageId,
      typeFile: typeFile,
      url: fileName,
    });

    if (!fileEntity) {
      throw new Error("Couldn't create file");
    }
  }
};
