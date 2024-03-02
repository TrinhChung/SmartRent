import {
    getUserNotification,
    upsertMessageNotify,
} from "../services/notify";

export const getNotifyController = async (req, res, next) => {
    try {
        const id = req.query.id;
        console.log(id)
        const notify = await getUserNotification(id);
        return res.status(200).json({
            notifyRead: notify.notifyRead,
            notifyUnRead: notify.notifyUnRead,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message});
    }
}

export const handleUpsertMessageNotify = async (req, res, next) => {
    try {
        const data = req.body;
        const notify = await upsertMessageNotify(data);
        return res.status(200).json({
            data: notify
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message});
    }
}