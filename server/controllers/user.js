import Store from "../models/store.js";
import User from "../models/user.js";
//UPDATE USER
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

//DELETE USER

export const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteUser);
  } catch (err) {
    next(err);
  }
};
//GET USER
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
// export const getUsers = async (req, res, next) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     next(err);
//   }
// };

//GET USERS
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    const usersData = await Promise.all(
      users.map(async (user) => {
        const storeData =
          user.role === "sm"
            ? await Store.findById(user.store.toString())
            : null;
        return {
          storeName:
            user.role === "sm"
              ? `${storeData.storeLocation}(${storeData.storeName})`
              : null,
          ...user._doc,
        };
      })
    );
    res.status(200).json(usersData);
  } catch (err) {
    next(err);
  }
};
