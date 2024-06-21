import { client } from "../config/connectRedis";
import { checkFileExistInSession } from "../utils/fileProcess";
import { writePdfContract } from "../services/file";

export const handleUploadImage = async (req, res, next) => {
  try {
    const files = req.files;
    if (files?.length > 0) {
      for (let file of files) {
        const name = file?.originalname;
        const size = file?.size;
        const key = name + "*" + size;
        const base64Image = Buffer.from(file.buffer, "binary").toString(
          "base64"
        );
        const isExist = await checkFileExistInSession(key);
        if (isExist === false) {
          await client.set(key, base64Image, (error, result) => {
            if (error) {
              return res.status(403).json({ message: "Error uploading image" });
            }
            if (result) {
              console.log("Upload image successfully");
            }
            client.expire(key, 60 * 60 * 1);
          });
        } else {
          console.log("File exists in session");
        }
      }
    } else {
      return res.status(422).json({ message: "Upload minimum 1 file" });
    }

    return res.status(200).json({ message: "Uploaded image successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error uploading image" });
  }
};

export const handleUploadContact = async (req, res) => {
  try {
    const { file, contractId } = req.body;

    const url = await writePdfContract({ file: file, contractId: contractId });
    return res
      .status(200)
      .json({ message: "Upload contact successfully", data: url });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error upload contact" });
  }
};
