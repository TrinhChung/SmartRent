import { getRoomChatService } from "../services/roomChat";

export const getRoomChatController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const roomChat = await getRoomChatService(id);
    return res.status(200).json({
      data: {
        roomChat: roomChat,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Get room chat error" });
  }
};

export const handleCreateRoomChat = async (req, res, next) => {
  try {
    return res.status(200).json({ message: "Create room chat" });
  } catch (error) {
    return res.status(400).json({ error: "Create room chat error" });
  }
};
