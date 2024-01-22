import { roomSocketPermission } from "../middleware/roomChat";

export const checkRoomPermissionSocket = (socket, next) => {
  roomSocketPermission(socket, next);
  next();
};
