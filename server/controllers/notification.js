import Notification from "../models/notification.js";
import Category from "../models/category.js";
// CREATE Notification

export const createNotification = async (req, res, next) => {
  try {
    const newNotification = new Notification(req.body);
    await newNotification.save();
    res.status(200).send(newNotification);
  } catch (err) {
    next(err);
  }
};

//UPDATE Notification
export const updateNotification = async (req, res, next) => {
  try {
    const updatedAmount = req.body.amount;
    if (updatedAmount < 1) {
      return res
        .status(400)
        .json({ error: "Amount must be greater than or equal to 1" });
    }
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedNotification);
  } catch (err) {
    next(err);
  }
};

//DELETE Notification

export const deleteNotification = async (req, res, next) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json("Notification has been deleted");
  } catch (err) {
    next(err);
  }
};
//GET Notification
export const getNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    res.status(200).json(notification);
  } catch (err) {
    next(err);
  }
};

//GET Notifications

// export const getNotifications = async (req, res, next) => {
//   try {
//     const { notificationName, type, ...others } = req.query;
//     let query = others;
//     if (notificationName) {
//       query.notificationName = notificationName;
//     }
//     if (type) {
//       query.type = type;
//     }
//     const notifications = await Notification.find(query);
//     res.status(200).json(notifications);
//   } catch (err) {
//     next(err);
//   }
// };
export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find().sort({
      createdAt: -1,
    });
    res.status(200).json(notifications);
  } catch (err) {
    next(err);
  }
};
