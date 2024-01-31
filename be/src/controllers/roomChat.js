import {
  changeNameRoomChatService,
  createRoomChatService,
  getRoomChatForMeService,
  getRoomChatService,
} from "../services/roomChat";

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
    res.status(400).json({ message: error.message });
  }
};

export const handleCreateRoomChat = async (req, res, next) => {
  try {
    const data = req.body;
    const roomChat = await createRoomChatService(data);
    return res
      .status(200)
      .json({ message: "Create room chat", data: roomChat });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Create room chat error" });
  }
};

export const handleGetRoomChatForMe = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const roomChats = await getRoomChatForMeService(userId);
    return res
      .status(200)
      .json({ message: "Get room chat for me successfully", data: roomChats });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Get room chat for me error" });
  }
};

export const handleChangeNameRoomChat = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    const newRoom = await changeNameRoomChatService(data);

    return res
      .status(200)
      .json({ message: "Change name room chat successfully", data: newRoom });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "change name room chat for me error" });
  }
};
