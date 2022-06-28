import React, {useState} from "react";
import styled from "styled-components";
import ContactListComponents from "./Components/ContactListComponents";
import ConversationComponents from "./Components/ConversationComponents";
import { contactList } from "./mockData"; 
const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
  background: #f8f9fb;
 `;
 const Placeholder = styled.div`
  flex: 3;
  display: flex;   
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  gap: 10px;
  span{
    font-size: 32px;
    color: #525252;
  }
 
 `;
 const ChatPlaceholder = styled.img`
    width: 240px;
    height: 240px;
    border-radius: 50%;
    object-fit: contain;
 
 `;

function App() {
  const [selectedChat, setChat] = useState()
  return (<Container>
    <ContactListComponents setChat={setChat}/>
    {selectedChat?
    (<ConversationComponents selectedChat={selectedChat}/>)
    : (<Placeholder>
      <ChatPlaceholder src="data:image/jpeg;base64,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"/>
    <span> Keep Your Phone Connected</span>
    WhatsApp connects to Your phone to sync messages.
      </Placeholder>)}
        </Container>
  );
}

export default App;