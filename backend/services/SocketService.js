const { Server } = require("socket.io");
const userModel = require("../models/users.models");
const Auth = require("../controllers/user.controller");
const ChatController = require("../controllers/chat.controller");

const SocketService = {};
let sockets = [];
let onlineUsers = [];

SocketService.provideSocket = (id) => {
  console.log("Provide Socket For ID", id);
  let userSocket = sockets[id];
  return userSocket;
};

SocketService.globalSocket = (io) => {
  return io;
};

SocketService.connect = (io) => {
  io.use(async (socket, next) => {
    try {
      const { dbId } = socket.handshake.auth;
      if (!dbId) {
        return next(new Error("Authentication error"));
      }
      let currentUser = await userModel.findById({ _id: dbId }).lean();
      if (!currentUser) {
        return next(new Error("User not found"));
      }
      socket.data.user = currentUser;
      next();
    } catch (error) {
      next(error);
    }
  });

  io.on("connection", async (socket) => {
    onlineUsers.push(socket.id);
    sockets[socket.data.user._id] = socket;
    console.log("User is connected through socket");

    socket.join(socket.handshake.auth.dbId);
    await Auth.getAllUsers(socket.handshake.auth.dbId, io);
    // socket.on("getallusers", async () => {});
    socket.on("sendmessage", async (data, callback) => {
      console.log("datadatadatadata", data);
      await ChatController.addChat(data, io);
    });

    socket.on("chatHistory", async (data, callback) => {
      await ChatController.getChat(data, io);
    });

    socket.on("disconnect", async () => {
      console.log("User disconnected.");
      let socket_key = getKeyByValue(sockets, socket);
      delete sockets[socket_key];
      onlineUsers.splice(onlineUsers.indexOf(socket.id), 1);
      console.log("Online Users After Disconnect", onlineUsers.length);
    });
  });
};

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

module.exports = SocketService;
