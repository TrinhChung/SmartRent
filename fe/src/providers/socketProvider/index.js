import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../authProvider";
import { io } from "socket.io-client";
import { getRoomChatForMeService } from "../../services/RoomChat";
import { getNotifyOfUserService } from "../../services/Notify";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = io(process.env.REACT_APP_HOST_BE, { reconnect: true });
  const { authUser } = useContext(AuthContext);
  const [roomChats, setRoomChats] = useState([]);
  const [notifiesUr, setNotifiesUr] = useState([]);
  const [notifies, setNotifies] = useState([
    {
      content: "Có tin nhắn mới từ phòng 1",
      type: "1",
      time: new Date(),
      fkId: 1,
    },
    {
      content: "Có tin nhắn mới từ phòng 1",
      type: "1",
      time: new Date(),
      fkId: 2,
    },
  ]);

  useEffect(() => {
    fetchNotifyOfUser();
  }, []);

  const fetchNotifyOfUser = async () => {
    try {
      const res = await getNotifyOfUserService();
      if (res.status === 200) {
        setNotifies(res.notifyRead);
        setNotifiesUr(res.notifyUnRead);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      socket.emit("login", authUser.id);
    }
  }, [authUser]);

  const socketDisconnect = () => {
    socket.disconnect();
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        roomChats,
        notifies,
        notifiesUr,
        socketDisconnect,
        getRoomChatForMe,
        fetchNotifyOfUser,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
