import {
    getUserNotification,
    creatNotification,
    changeNotifyReadStateService
} from "../services/notify";

export const getNotifyController = async (req, res, next) => {
    try {
        const id = req.query.id;
        console.log(id)
        const notify = await getUserNotification(id);
        return res.status(200).json({
            data: notify,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message});
    }
}

export const handleChangeReadState = async (req, res, next) => {
    try {
        const data = req.body;
        const notify = await changeNotifyReadStateService(data);
        return res.status(200).json({
            data: notify
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message});
    }
}

export const handleCreatNotify = async (req, res, next) => {
    try {
      const data = {...req.body};
      console.log(data);
      const notify = await creatNotification(data);
      return res
        .status(200)
        .json({ message: "Create notify chat", data: notify });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Create notify error" });
    }
  };