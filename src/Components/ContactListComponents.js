import styled from "styled-components";
import { contactList } from "../mockData";
const Container = styled.div`
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
flex: 1.6;

`;
const ProfileInfoDiv = styled.div`
 display: flex;
 flex-direction: row;
 background: #ededed;
 padding: 10px;
`;
const ProfileImage = styled.img`
 width: 32px;
 height: 32px;
 border-radius: 50%;
`;
const SearchBox = styled.div`
    background: #f6f6f6;
    padding: 10px;
    display: flex;
`;
export const SearchConatiner = styled.div`
    display: flex;
    flex-direction: row;
    background: white;
    border-radius: 16px;
    width: 100%;
    padding: 5px 10px;
`;
const SearchIcon = styled.img`
   width: 28px;
   height: 28px;
`;
export const SearchInput = styled.input`
 width: 100%;
 outline: none;
 border: none;
 font-size: 15px;
`;
const ContactItem = styled.div`
 display: flex;
 flex-direction: row;
  border-bottom: 1px solid #f2f2f2;
 background: white;
 cursor: pointer;
 padding: 15px 12px;
 :hover{
    background: #ebebeb;
 }
`;
const ProfileIcon = styled(ProfileImage)`
 width: 38px;
 height: 38px;
`;
const ContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const ContactName = styled.span`
    width: 100%;
    font-size: 16px;
    color: black;
    margin: 0 12px;
`;
const MessageText = styled.span`
    width: 100%;
    font-size: 14px;
    margin-top: 3px;
    margin-left: 10px;
    color: rgba(0, 0, 0, 0.8)
`;
const MessageTime = styled.span`
   font-size: 12px;
   margin-right: 15px;
   color: rgba(0, 0, 0,  0.45);
   white-space: nowrap;
`;
const ContactComponent =(props)=>{
    const {userData, setChat} = props;
    return<ContactItem onClick={()=>setChat(userData)}>
        <ProfileIcon src= {userData.profilePic}/>
        
        <ContactInfo>
            <ContactName>{userData.name}</ContactName>
            <MessageText>{userData?.lastText}</MessageText>
        </ContactInfo>
        <MessageTime>{userData?.lastTextTime}</MessageTime>
        </ContactItem>;
}
const ContactListComponents = (props)=>{
    return (<Container>
        <ProfileInfoDiv>
        <ProfileImage src = "https://i.pinimg.com/236x/4e/9f/03/4e9f035d05faeb0561835197a51a51f5.jpg"/>
        
        </ProfileInfoDiv>
        <SearchBox>
            <SearchConatiner>
                <SearchIcon src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-21.png"/>
            <SearchInput placeholder="Search or start a new chat"/>
            </SearchConatiner>
        </SearchBox>
        {contactList.map((userData)=>(
            <ContactComponent userData={userData} setChat={props.setChat}/>
        
               
        ))}
        </Container>);
};
export default ContactListComponents;