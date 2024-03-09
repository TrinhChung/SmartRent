import { getUserNotification, readNotifyService } from "../services/notify";

export const handleGetNotifyForMe = async (req, res, next) => {
  try {
    const id = req.user.id;
    const notify = await getUserNotification(id);
    return res.status(200).json({
      message: "get notification successfully",
      notifyRead: notify.notifyRead,
      notifyUnRead: notify.notifyUnRead,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const handleReadNotify = async (req, res, next) => {
  try {
    const data = req.body;
    const notify = await readNotifyService(data.notifyId);
    return res.status(200).json({
      message: "update successful",
      data: notify,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
