import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContactListComponent from "./components/ContactListComponent";
import ConversationComponent from "./components/ConversationComponent";
import io from "socket.io-client";
import { SocketProvider } from "./context/socketProvider";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: row;
  align-items: center;
  background: #f8f9fb;
`;

const ChatPlaceholder = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  object-fit: contain;
`;
const Placeholder = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  gap: 10px;
  color: rgba(0, 0, 0, 0.45);

  span {
    font-size: 32px;
    color: #525252;
  }
`;

function App(props) {
  const { userInfo } = props;
  const [selectedChat, setChat] = useState();
  const [refreshContactList, toggleRefreshContactList] = useState(false);

  useEffect(() => {
    let socket = io("http://localhost:5000");
    socket.on("connect", () => {
      console.log("connected to server");
    });
    socket.emit("newUser", prompt("name?"));

    // socket.on("sendMessage", () => {
    //   console.log("connected to server");
    // });
    // socket.on("receiveMessage", (data) => {
    //   console.log(data);
    // });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container>
      <ContactListComponent
        setChat={setChat}
        userInfo={userInfo}
        refreshContactList={refreshContactList}
      />
      {selectedChat ? (
        <SocketProvider>
          <ConversationComponent
            selectedChat={selectedChat}
            userInfo={userInfo}
            refreshContactList={() =>
              toggleRefreshContactList(!refreshContactList)
            }
          />
        </SocketProvider>
      ) : (
        <Placeholder>
          <ChatPlaceholder src="/whatsapp-clone/welcome-placeholder.jpeg" />
          <span>Keep your phone connected</span>
          WhatsApp connects to your phone to sync messages.
        </Placeholder>
      )}
    </Container>
  );
}

export default App;
