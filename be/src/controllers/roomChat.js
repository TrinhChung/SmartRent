import { getRoomChatService } from "../services/roomChat";

let getRoomChatController = async (req, res, next) => {
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

module.exports = {
  getRoomChatController: getRoomChatController,
};
