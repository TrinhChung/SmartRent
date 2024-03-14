import { client } from "../config/connectRedis";
import db from "../models/index";
import moment from "moment";
const path = require("path");
const fs = require("fs");

export const createFileService = async (data, typeFk = "1", transaction) => {
  const fkId = data.fkId;

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
    const fileEntity = await db.File.create(
      {
        typeFk: typeFk,
        fkId: fkId,
        typeFile: typeFile,
        url: fileName,
      },
      { transaction: transaction }
    );

    if (!fileEntity) {
      throw new Error("Couldn't create file");
    }
  }
};

export const writePdfContract = async ({ contractId, file }) => {
  try {
    const time = moment(new Date()).valueOf();
    const fileName = time + "_contract.pdf";
    const pathWrite = path.join(path.resolve("./media/"), fileName);
    fs.writeFileSync(pathWrite, file, { encoding: "base64" });

    await db.File.create({
      typeFk: "6",
      fkId: contractId,
      typeFile: "pdf",
      url: fileName,
    });

    return fileName;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't create contract");
  }
};
