const mongoose = require("mongoose");

const KeySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Account", 
    required: true 
  },
  privateKey: { 
    type: String, 
    required: true 
  },
  publicKey: { 
    type: String, 
    required: true 
  },
  refreshToken: { 
    type: Array, 
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model("Key", KeySchema);