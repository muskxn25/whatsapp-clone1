import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GoogleLogin } from "react-google-login";
import App from "../../App";
import cookieManager from "../../managers/cookieManager";
import httpManager from "../../managers/httpManager";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #0a0e11;
  height: 100vh;
`;

const Header = styled.div`
  color: white;
  width: 100%;
  font-weight: bold;
  background-color: #56bca6;
  padding: 50px 50px 140px;
  font-size: 14px;
`;
const CardView = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 30px 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -80px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 40px;
  flex-wrap: wrap;
`;

const Instructions = styled.div`
  padding: 20px;
  font-size: 16px;

  ol {
    margin: 40px 0;
  }

  li {
    margin: 15px 0;
  }
`;

const Heading = styled.span`
  font-size: 24px;
  color: #525252;
`;

const QRCode = styled.img`
  width: 264px;
  height: 264px;
  background-color: white;
`;

const LoginComponent = () => {
  const [userInfo, setUserInfo] = useState();
  const [loginData, setLoginData] = useState({
    contact_no: "",
    otp: ""
  })
  useEffect(() => {
    const userData = cookieManager.getUserInfo();
    if (userData) setUserInfo(userData);
  }, []);

  const responseGoogle = async (response) => {
    await httpManager.createUser({
      email: response.profileObj.email,
      name: response.profileObj.name,
      profilePic: response.profileObj.imageUrl,
    });
    setUserInfo(response.profileObj);
    cookieManager.setUserInfo(response.profileObj);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
    let user = await httpManager.createUser({
      contact_no: loginData.contact_no,
      otp: loginData.otp
    })
    console.log(user);
    setUserInfo(user.data.token);
    cookieManager.setUserInfo(user.data.token);
  }

  return (
    <>
      {userInfo ? (
        <App userInfo={userInfo} />
      ) : (
        <Container>
          <Header>WHATSAPP WEB CLONE</Header>
          <CardView>
            <Instructions>
              <Heading>To use WhatsApp on your computer:</Heading>
              <form onSubmit={handleSubmit}>
                <input type="number" name="contact_no" onChange={e => setLoginData({ ...loginData, [e.target.name]: e.target.value })} placeholder="Enter a number" />
                <input type="number" name="otp" onChange={e => setLoginData({ ...loginData, [e.target.name]: e.target.value })} placeholder="OTP" />
                <button type="submit">Submit</button>
              </form>

            </Instructions>
            <QRCode src="whatsapp-clone/qr-placeholder.png" />
          </CardView>
        </Container>
      )}
    </>
  );
};
export default LoginComponent;
