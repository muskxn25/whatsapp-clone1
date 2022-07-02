import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import cookieManager from "../managers/cookieManager";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const userData = cookieManager.getUserInfo();
    // console.log(user);
    if (userData) {
      let socket = io("http://localhost:5000");

      setSocket(socket);
      return () => socket.close();
    }
  }, []);

  return (
    <SocketContext.Provider value={{ messageList, setMessageList, socket }}>
      {children}
    </SocketContext.Provider>
  );
}
