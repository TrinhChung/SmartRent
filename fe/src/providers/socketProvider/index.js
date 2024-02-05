import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../authProvider";
import { io } from "socket.io-client";
import { getRoomChatForMeService } from "../../services/RoomChat";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { authUser } = useContext(AuthContext);
  const [roomChats, setRoomChats] = useState([]);
  const socket = io(process.env.REACT_APP_HOST_BE, { reconnect: true });

  const getRoomChatForMe = async () => {
    try {
      const res = await getRoomChatForMeService();
      if (res.status === 200) {
        setRoomChats(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authUser) {
      getRoomChatForMe();
    }
  }, [authUser]);

  const socketDisconnect = () => {
    socket.disconnect();
  };

  return (
    <SocketContext.Provider
      value={{ socket, roomChats, socketDisconnect, getRoomChatForMe }}
    >
      {children}
    </SocketContext.Provider>
  );
};
