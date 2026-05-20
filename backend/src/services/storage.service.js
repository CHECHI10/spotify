const {ImageKit} = require("@imagekit/nodejs")
// import ImageKit from '@imagekit/nodejs';

const imageKitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
  try{
    const result = await imageKitClient.files.upload({
      file,
      fileName: `spotify-${Date.now()}`,
      folder: "/spotify"
    })

    return result;
  } catch(error) {
    console.error("Error uploading file to ImageKit:", error);
    throw error;
  }
}

module.exports = {uploadFile};