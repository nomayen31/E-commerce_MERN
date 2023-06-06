require('dotenv').config();


const serverPort = process.env.SERVER_PORT || 5001;
const mongodbURL = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/ecommerceMernDB";

const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || '../public/images/users//default.png'

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY ||'ndsakfjhgasdoi_53d4g2f4ds2g';


module.exports= {serverPort,mongodbURL, defaultImagePath, jwtActivationKey};