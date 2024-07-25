const userModel = require("../models/users.models");
const AuthUtils = require("../utils/Auth")
const ChatModels = require("../models/chat.models")
const { ObjectId } = require("mongodb");
const ChatController = {};

ChatController.addChat = async (data,io) => {
  const { receiverId,senderId,message} = data;
  try {
    const newChat = new ChatModels({senderId:senderId,receiverId:receiverId,message:message})
    await newChat.save();
    io.to(senderId).emit("receivemessageforsender",data)
    io.to(receiverId).emit("receivemessageforreceiver",data)

  } catch (error) {
    console.log(error)
  }
};

ChatController.getChat = async (data,io) => {
  try {
    const sender = new ObjectId(data.sender)
    const receiver  = new ObjectId(data.receiver)
    const messages = await ChatModels.find({
      $or: [
        { senderId: sender, receiverId: receiver },
        { senderId: receiver, receiverId: sender }
      ]
    }).sort({ createdAt: 1 }); // Sort messages by timestamp

    io.emit("allmessges",messages)
    io.emit("allmessges",messages)

  } catch (err) {
    console.log(err)
  }
};


module.exports = ChatController;
