import Sell from "../models/sell.js";
import Category from "../models/category.js";
import User from "../models/user.js";
import Store from "../models/store.js";
// CREATE Sell

export const createSell = async (req, res, next) => {
  try {
    const newSell = new Sell(req.body);
    await newSell.save();
    res.status(200).send(newSell);
  } catch (err) {
    next(err);
  }
};

//UPDATE Sell
export const updateSell = async (req, res, next) => {
  try {
    const updatedSell = await Sell.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedSell);
  } catch (err) {
    next(err);
  }
};

//DELETE Sell

export const deleteSell = async (req, res, next) => {
  try {
    await Sell.findByIdAndDelete(req.params.id);
    res.status(200).json("Sell has been deleted");
  } catch (err) {
    next(err);
  }
};
//GET Sell
export const getSell = async (req, res, next) => {
  try {
    const sell = await Sell.findById(req.params.id);
    res.status(200).json(sell);
  } catch (err) {
    next(err);
  }
};

//GET Sells

// export const getSells = async (req, res, next) => {
//   try {
//     const sells = await Sell.find();
//     const sellData = await Promise.all(
//       sells.map(async (sell) => {
//         const categoryData = await Category.findById(
//           sell.categoryId.toString()
//         );
//         return {
//           categoryName: categoryData.categoryName,
//           ...sell._doc,
//         };
//       })
//     );
//     res.status(200).json(sellData);
//   } catch (err) {
//     next(err);
//   }
// };

export const getSells = async (req, res, next) => {
  try {
    const sells = await Sell.find().sort({ createdAt: -1 });
    const sellsData = await Promise.all(
      sells.map(async (sell) => {
        const userData = await User.where("store").equals(sell.storeId);

        const categoryData = await Category.findById(
          sell.categoryId.toString()
        );
        const storeData = await Store.findById(sell.storeId.toString());

        return {
          storeName: storeData.storeName,
          manager: userData.map((user) => user.firstName),
          categoryName: categoryData.categoryName,
          ...sell._doc,
        };
      })
    );
    res.status(200).json(sellsData);
  } catch (err) {
    next(err);
  }
};
