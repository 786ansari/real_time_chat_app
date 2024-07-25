const mongoose = require('mongoose')

const chatSchema = mongoose.Schema(
  {
    senderId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"users"
    },
    receiverId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"users"
    },
    message:{
      type:String,
      required:true
    },
  },
  {
    timestamps: true,
  }
);


const ChatModels = mongoose.model('chats', chatSchema);
module.exports = ChatModels
