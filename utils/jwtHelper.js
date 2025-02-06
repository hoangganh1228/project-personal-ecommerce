'use strict';
const JWT = require("jsonwebtoken")
// const crypto = require("crypto");
// const bcrypt = require("bcryptjs");


const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // accessToken
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: '2 days'
    })

    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: '7 days'
    })

    // 
    JWT.verify(accessToken, publicKey, (err, decode) => {
      if(err) {
        console.log(`error verify::`, err);
      } else {
        console.log(`decode verify::`, decode);
      }
      
    })


    return {accessToken, refreshToken}

  } catch (error) {
    console.error(`Error creating token pair:`, error);
    throw error; // Hoặc trả về { error: "Failed to create tokens" }
  }
}

module.exports = {
  createTokenPair
}