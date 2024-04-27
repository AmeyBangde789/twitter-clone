import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        const notification = await Notification.find({ to: userId }).populate({
            "path": "from",
            select: "username profileImg"
        });

        await Notification.updateMany({ tp: userId }, { read: true });

        res.status(200).json(notification);
    } catch (error) {
        console.log("erro in notification function", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}
export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.deleteMany({ to: userId });

        res.status(200).json({ mesage: "Notification deleted successfully" });
    } catch (error) {
        console.log("error in deleteNotification function", error.message);
        res.status(500).json({ error: "inrternal server error" });
    }
}

export const deleteNotification = async(req,res)=>{
    try {
        const notificationId=req.params.id;
        const userId=req.user._id;
        const notification =await Notification.findById(notificationId);

        if(!notification){
            return res.status(404).json({error:"Notification"})
        } 

        if(notification.to.toString() !== userId.toString()){
            return res.status(403).json({error:"You are not allowed to delete this notification"})
        }

        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({message: "Notification deleted successfully"})
    } catch (error) {
        console.log("error in deleteNotification function", error.message);
        res.status(500).json({ error: "inrternal server error" });
    }
}