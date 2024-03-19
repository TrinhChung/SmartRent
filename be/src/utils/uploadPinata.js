// Use the api keys by specifying your api key and api secret
const pinataSDK = require('@pinata/sdk');
const path = require("path")
const fs = require("fs")
require("dotenv").config()

const pinataApiKey = process.env.PINATA_API_KEY || ""
const pinataApiSecret = process.env.PINATA_API_SECRET || ""
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret)

const imageLocation = "./images"
const metadataTemplate = {
  name: "",
  description: "",
  image: "",
  attributes: [
    {
      seller_id: "1",
      renter_id: "2",
      cost: "300",
    }
  ]
}


async function storeImage (imagesPathFile) {
    const fullImagePath = path.resolve(imagesPathFile)
    const files = fs.readdirSync(fullImagePath);
    let responses = [];
    console.log("Uploading to ipfs");
    for (fileIndex in files) {
        const readableStreamForFile = fs.createReadStream(`${fullImagePath}/${files[fileIndex]}`);
        const options = {
            pinataMetadata: {
                name: files[fileIndex],
            },
        }
        try {
            await pinata
                .pinFileToIPFS(readableStreamForFile,options)
                .then((result) => {
                    responses.push(result)
                })
                .catch((err) => {
                    console.log(err)
                });
        } catch (err) {
            console.log(`Upload to ipfs fail: ${err}`);
        }
    }
    return { responses, files };
}

async function storeTokenUriMetadata(metadata) {
    const options = {
        pinataMetadata: {
            name: metadata.name,
        },
    }
    try {
        const response = await pinata.pinJSONToIPFS(metadata, options)
        return response
    } catch (error) {
        console.log(error)
    }
    return null
}

async function handleTokenUris() {
    tokenUris = []
  
    const { responses: imageUploadReponses, files } = await storeImage(imageLocation)
    for (imageUploadIndex in imageUploadReponses) {
      let tokenUrimetadata = {...metadataTemplate};
      tokenUrimetadata.name = files[imageUploadIndex].replace(".png","")
      tokenUrimetadata.description = 'address bla bla'
      tokenUrimetadata.image = `ipfs://${imageUploadReponses[imageUploadIndex].IpfsHash}`
      console.log(`Uploading ${tokenUrimetadata}`);
      const metadataUpload = await storeTokenUriMetadata(tokenUrimetadata);
      tokenUris.push(`ipfs://${metadataUpload}`);
    }
  
    return tokenUris;
}

module.exports = { handleTokenUris }