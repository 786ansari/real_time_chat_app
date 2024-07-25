import React, { useContext, useEffect, useState } from "react";
import { Layout, Input, Avatar, List, Typography, Badge, Button } from "antd";
import { UserOutlined, SearchOutlined, SendOutlined } from "@ant-design/icons";
import { profileContext } from "../context/Profile.context";
import useSocket from "../hooks/useSocket";
import  moment from "moment"
import Logout from "../comman/logout"

const { Header, Sider, Content, Footer } = Layout;
const { Text } = Typography;

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [userBySearch, setUserBySearch] = useState([]);
  const [search, setSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { name, dbId, isAuthenticated } = useContext(profileContext);
  const { userList, messageList, sendMessage, requestForUsersChat, searchUserByName } =
    useSocket();


  const handleChatChange = (item) => {
    console.log(item)
    setSelectedChat(item._id);
    const data = {
      receiver: item._id,
      sender: dbId,
    };
    requestForUsersChat(data);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(dbId, selectedChat, inputValue);
      setInputValue("");
    }
  };
  const handleSearch = (e) => {
    const { value } = e.target
    if(value){
      setSearch(true)
      const temArray = userList
      const filterdArray = temArray.filter(item=>{return item.name.toLowerCase().includes(value.toLowerCase())})
      setUserBySearch(filterdArray)
    }else{
      setSearch(false)
      setUserBySearch(userList)
    }
    
  }

  return (
    <Layout style={{ minHeight: "100vh" }} className="main-chat">
      <Sider width={320} className="chat-sider">
        <div className="sider-header">
          <Avatar icon={<UserOutlined />} size={40} />
          <Text strong style={{ marginLeft: 16 }}>
            {name || "USER"}
          </Text>
        </div>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search or start a new chat"
          className="search-input"
          onChange={handleSearch}
        />
        <div className="chat-list">
          <List
            itemLayout="horizontal"
            dataSource={!search?userList : userBySearch}
            renderItem={(item) => (
              <List.Item
                className={`chat-item ${
                  selectedChat === item?._id ? "selected" : ""
                }`}
                onClick={() => handleChatChange(item)}
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} src={item?.avatar} />}
                  title={
                    <div className="chat-item-title">
                      {item?.name?.substring(0, 6) + "..."}{" "}
                      {item.unread && <Badge dot />}{" "}
                    </div>
                  }
                  // description={item?.message?.substring(0, 6) + "..."}
                />
                <div className="chat-item-time">{item.time}</div>
              </List.Item>
            )}
          />
        </div>
      </Sider>
      <Layout>
        <Header className="chat-header main-header">
          <Text strong>
            {selectedChat
              ? "Chat with " +
                userList.find((chat) => chat._id === selectedChat).name
              : "No Chat Selected"}
          </Text>
          <Logout/>
        </Header>
        <Content className="chat-content">
          {selectedChat ? (
            <List
              dataSource={messageList}
              renderItem={(msg) => (
                <List.Item
                  style={{
                    justifyContent:
                      msg.senderId === dbId ? "flex-end" : "flex-start",
                    display: "flex",
                  }}
                >
                  <List.Item.Meta
                    style={{
                      background:
                        msg.senderId === selectedChat ? "#fff" : "#dcf8c6",
                      padding: "10px",
                      borderRadius: "10px",
                      maxWidth: "60%",
                    }}
                    title={msg.message}
                    description={moment(msg?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                  />
                </List.Item>
              )}
            />
          ) : (
            <div className="no-chat-selected">
              <Text strong type="primary">
                Send and receive message without keeping your phone online
              </Text>
              <br/>
              <Text type="secondary">
                WhatsApp connects to your phone to sync messages. To reduce data
                usage, connect your phone to Wi-Fi.
              </Text>
            </div>
          )}
        </Content>
        {selectedChat && <Footer className="chat-footer">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleSend}
            placeholder="Type a message..."
            style={{ flex: 1, marginRight: 8 }}
          />
          <Button type="primary" icon={<SendOutlined />} onClick={handleSend}>
            Send
          </Button>
        </Footer>}
      </Layout>
    </Layout>
  );
};

export default ChatPage;
