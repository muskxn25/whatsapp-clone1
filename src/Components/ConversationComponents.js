import styled from "styled-components";
import React, {useState} from "react";
import { SearchConatiner, SearchInput } from "./ContactListComponents";
import { messagesList } from "../mockData";
import Picker from "emoji-picker-react";
const Container = styled.div`
display: flex;
flex-direction: column;
height: 100%;
flex: 3;
background: #f6f7f8;

`;

const ProfileHeader = styled.div`
   display: flex;
   flex-direction: row;
   background: #ededed;
   padding: 10px;
   align-items: center;
   gap: 10px;
`;
const ProfileImage = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;

`;
const ChatBox = styled.div`
  display: flex;
  background: #f0f0f0;
  padding: 10px;
  align-items: center;
  bottom: 0;
`;
const EmojiImage = styled.img`
width: 28px;
height: 28px;
opacity: 0.4;
cursor: pointer;
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #e5ddd6;
  overflow-y: auto;

`;
const MessageDiv = styled.div`
justify-content: ${props => props.isYours? 'flex-end':'flex-start'};
display: flex;
margin: 5px 15px;

`;
const Message = styled.div`
    background: ${props => props.isYours? '#daf8cb':'white'};
   border-radius: 4px;
   max-width: 50%;
   color: #303030;
   padding: 8px 10px;
   font-size: 14px;

`;

    
const ConversationComponents = (props)=>{
    const {selectedChat } = props;
    const[text, setText] = useState("");

    const onEmojiClick=(event, emojiObj)=>{
        setText(text+emojiObj.e)
    };
    return<Container>
        <ProfileHeader>
        <ProfileImage src = {selectedChat.profilePic}/>
        {selectedChat.name}
        </ProfileHeader>
        <MessageContainer>
            {messagesList.map((messageData)=> <MessageDiv isYours={messageData.senderID ===0}>
                <Message isYours ={messageData.senderID ===0}>{[messageData.text]}</Message>
            </MessageDiv>)}
            
        </MessageContainer>
        <ChatBox>
            <SearchConatiner>
                <Picker
                pickerStyle={ {position: "absolute", bottom: "60px"}}
                 onEmojiClick={onEmojiClick}/>
                <EmojiImage src="data:image/png;base64,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"/>
                <SearchInput placeholder="Type a message" value={text} onChange={(e)=>setText(e.target.value)}/>
            </SearchConatiner>
        </ChatBox>
        </Container>
}
export default ConversationComponents;