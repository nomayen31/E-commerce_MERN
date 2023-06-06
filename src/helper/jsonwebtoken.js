const jwt = require('jsonwebtoken');


const createJsonWebToken = (playload,secretKey,expiresIn ) =>{
    if (typeof playload !== 'object' || !playload) {
        throw new Error('Playload must be a non-empty object');  
    }
    if (typeof secretKey !== 'string' || !secretKey === '') {
        throw new Error('secretKey  must be a non-empty string');  
    }
    try {
        const token = jwt.sign(playload,secretKey, {expiresIn});
    return token;
    } catch (error) {
        console.error('Failed to sign the jwt:'  , error);
        throw error ;
    }
} 


module.exports = {createJsonWebToken}