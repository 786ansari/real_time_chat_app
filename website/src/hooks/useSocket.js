import { useContext, useEffect, useMemo, useState } from "react";
import { baseUrl } from "../services/api.routes";
import { io } from "socket.io-client";
import { profileContext } from "../context/Profile.context";

const useSocket = () => {
  const [userList, setUserList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const { dbId } = useContext(profileContext);
  const socket =useMemo(
    () =>
      io(baseUrl, {
        transports: ["websocket", "polling"],
        auth: {
          dbId: dbId,
        },
      }),
    [dbId]
  );
  useEffect(() => {
    socket.on("connection", (val) => {
      console.log("connected:", val);
    });
    socket.on("allusers", (res) => {
      setUserList(res);
    });
    socket.on("receivemessageforsender", (mes) => {
      setMessageList((prev) => [...prev, mes]);
    });
    socket.on("receivemessageforreceiver", (mes) => {
      setMessageList((prev) => [...prev, mes]);
    });
    socket.on("allmessges", (resp) => {
      setMessageList(resp);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });
    return () => {
      socket.off("allusers");
      socket.off("message");
      socket.off("allmessges");
      socket.off("receivemessageforsender");
      socket.off("receivemessageforreceiver");
    };
  }, [dbId]);
  const sendMessage = (userId, receiverId, message) => {
    if (!message.trim()) return;
    const msg = { senderId: userId, receiverId: receiverId, message: message };
    socket.emit("sendmessage", msg);
  };
  const requestForUsersChat = (data) => {
    socket.emit("chatHistory", data);
  };

  return {
    userList,
    messageList,
    sendMessage,
    requestForUsersChat
  };
};

export default useSocket;
