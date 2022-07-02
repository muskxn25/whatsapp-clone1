import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SearchContainer, SearchInput } from "./ContactListComponent";
import Picker from "emoji-picker-react";
// import { messagesList as mL } from "../mockData";
import httpManager from "../managers/httpManager";
import { useSocket } from "../context/socketProvider";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  height: 100%;
  width: 100%;
  background: #f6f7f8;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  padding: 10px;
  align-items: center;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
const ContactName = styled.span`
  font-size: 16px;
  color: black;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: row;
  background: #f0f0f0;
  padding: 10px;
  align-items: center;
  bottom: 0;
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  background: #e5ddd6;
`;
const MessageDiv = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isYours ? "flex-end" : "flex-start")};
  margin: 5px 15px;
`;
const Message = styled.div`
  background: ${(props) => (props.isYours ? "#daf8cb" : "white")};
  padding: 8px 10px;
  border-radius: 4px;
  max-width: 50%;
  color: #303030;
  font-size: 14px;
`;
const EmojiImage = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  opacity: 0.4;
  cursor: pointer;
`;
function ConversationComponent(props) {
  const { selectedChat, userInfo, refreshContactList } = props;
  const [text, setText] = useState("");
  const [pickerVisible, togglePicker] = useState(false);
  let { socket, setMessageList, messageList } = useSocket();
  useEffect(() => {
    // setMessageList(mL);
    getAllChats();
  }, [selectedChat]);

  useEffect(() => {
    if (socket === null) return;

    socket?.on("receiveMessage", (sms) => {
      console.log(sms, "rece smsm");
      console.log(messageList);

      setMessageList([...messageList, sms]);
      console.log(messageList);
    });
    console.log(userInfo);
    return () => {
      socket?.off("receiveMessage");
    };
  }, [socket, selectedChat]);

  const getAllChats = async () => {
    let data = await httpManager.getChannelList({
      sender_id: userInfo.contact_no,
      receiver_id: selectedChat.otherUser.receiver_id,
    });
    console.log(data);
    setMessageList(data.data.chat);
  };

  const onEnterPress = async (event) => {
    let channelId = selectedChat.channelData._id;
    if (event.key === "Enter") {
      if (!messageList || !messageList.length) {
        const channelUsers = [
          {
            email: userInfo.email,
            name: userInfo.name,
            profilePic: userInfo.imageUrl,
          },
          {
            email: selectedChat.otherUser.email,
            name: selectedChat.otherUser.name,
            profilePic: selectedChat.otherUser.profilePic,
          },
        ];
        const channelResponse = await httpManager.createChannel({
          channelUsers,
        });
        channelId = channelResponse.data.responseData._id;
      }
      refreshContactList();
      const messages = [...messageList];
      const msgReqData = {
        text,
        senderEmail: userInfo.email,
        addedOn: new Date().getTime(),
      };
      const messageResponse = await httpManager.sendMessage({
        channelId,
        messages: msgReqData,
      });
      messages.push(msgReqData);
      setMessageList(messages);
      setText("");
    }
  };

  const handleSubmit = async (e) => {
    if (e.key === "Enter") {
      let s = {
        id: 1,
        messageType: "TEXT",
        message: text,
        sender_id: userInfo.contact_no,
        addedOn: "12:00 PM",
        receiver_id: selectedChat.otherUser.receiver_id,
      };

      socket.emit("sendMessage", s);
      console.log("emit sent", messageList);
      setMessageList([...messageList, s]);
      console.log("sent", messageList);
      setText("");
    }
  };
  return (
    <Container>
      <ProfileHeader>
        <ProfileInfo>
          <ProfileImage src={selectedChat.otherUser.profilePic} />
          <ContactName>{selectedChat.otherUser.name}</ContactName>
        </ProfileInfo>
      </ProfileHeader>
      <MessageContainer>
        {messageList?.map((messageData, index) => (
          <MessageDiv
            key={index}
            isYours={messageData.sender_id === userInfo.contact_no}
          >
            <Message isYours={messageData.sender_id === userInfo.contact_no}>
              {`${messageData.message}`}
            </Message>
          </MessageDiv>
        ))}
      </MessageContainer>

      <ChatBox>
        <SearchContainer>
          {pickerVisible && (
            <Picker
              pickerStyle={{ position: "absolute", bottom: "60px" }}
              onEmojiClick={(e, emoji) => {
                setText(text + emoji.emoji);
                togglePicker(false);
              }}
            />
          )}
          <EmojiImage
            src={"/whatsapp-clone/data.svg"}
            onClick={() => togglePicker((pickerVisible) => !pickerVisible)}
          />
          <SearchInput
            placeholder="Type a message"
            value={text}
            onKeyDown={handleSubmit}
            onChange={(e) => setText(e.target.value)}
          />
        </SearchContainer>
      </ChatBox>
    </Container>
  );
}

export default ConversationComponent;
