import {
  createMessageService,
  getMessagesOfRoomChatService,
} from "../services/message";

export const handleCreateMessage = async (req, res, next) => {
  try {
    const data = { ...req.body, userId: req.user.id };
    const message = await createMessageService(data);

    res.status(200).json({ message: "create successfully", data: message });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error creating message" });
  }
};

export const handleGetMessageByRoomId = async (req, res, next) => {
  try {
    const roomChatId = req.query.roomChatId;
    const messages = await getMessagesOfRoomChatService({
      roomChatId: roomChatId,
    });
    return res
      .status(200)
      .json({ message: "Message successfully", data: messages });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error creating message" });
  }
};
