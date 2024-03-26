import { writePdfContract } from "./file"
const pinataSDK = require("@pinata/sdk");
const fs = require("fs");
const path = require("path");


const pinataApiKey = process.env.PINATA_API_KEY || "";
const pinataApiSecret = process.env.PINATA_API_SECRET || "";
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret);

export async function uploadFiletoIpfs(file, contractId) {
  const fileName = await writePdfContract({contractId, file})
  const fullImagePath = path.join(path.resolve("./media/"), fileName);
  const stream = fs.createReadStream(fullImagePath);
    const options = {
      pinataMetadata: {
        name: "sc",
      },
    };
    var responses;
    try {
      const result = await pinata.pinFileToIPFS(stream, options)
      responses = result;
      return {responses};
    } catch (error) {
      console.log("Upload Ipfs false", error)
      throw new Error(error)
    }

  }