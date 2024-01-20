import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../authProvider";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { authUser } = useContext(AuthContext);
  const socket = io(process.env.REACT_APP_HOST_BE, { reconnect: true });

  const socketDisconnect = () => {
    socket.disconnect();
  };

  useEffect(() => {
    if (authUser) {
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, socketDisconnect }}>
      {children}
    </SocketContext.Provider>
  );
};
