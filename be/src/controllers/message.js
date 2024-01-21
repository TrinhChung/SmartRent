import { createMessageService } from "../services/message";

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
