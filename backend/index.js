const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Auth = require('./controllers/user.controller');
const SocketService = require("./services/SocketService");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  pingTimeOut:60000,
  cors: {
    origin: ["http://localhost:3000","http://192.168.1.5:3000"],
  },
});

app.use(cors());
app.use(express.json());

app.post("/register", Auth.register);
app.post("/login", Auth.login);
app.post("/profile", Auth.getProfile);
app.post("/getAllProfile", Auth.getProfile);

mongoose.connect('mongodb://localhost:27017/chat', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

SocketService.connect(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
