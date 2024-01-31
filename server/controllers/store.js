import Store from "../models/store.js";
import User from "../models/user.js";
import Product from "../models/product.js";
import Sell from "../models/sell.js";
import Purchase from "../models/purchase.js";
// CREATE STORE

export const createStore = async (req, res, next) => {
  try {
    const newStore = new Store(req.body);
    await newStore.save();
    res.status(200).send(newStore);
  } catch (err) {
    next(err);
  }
};

//UPDATE STORE
export const updateStore = async (req, res, next) => {
  try {
    const updatedStore = await Store.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedStore);
  } catch (err) {
    next(err);
  }
};

//DELETE STORE

export const deleteStore = async (req, res, next) => {
  try {
    const deleteStore = await Store.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteStore);
  } catch (err) {
    next(err);
  }
};
//GET STORE
export const getStore = async (req, res, next) => {
  try {
    const store = await Store.findById(req.params.id);
    res.status(200).json(store);
  } catch (err) {
    next(err);
  }
};

//GET STORES

// export const getStores = async (req, res, next) => {
//   try {
//     const stores = await Store.find();
//     res.status(200).json(stores);
//   } catch (err) {
//     next(err);
//   }
// };

export const getStores = async (req, res, next) => {
  try {
    const stores = await Store.find().sort({ createdAt: -1 });
    const storesData = await Promise.all(
      stores.map(async (store) => {
        const userData = await User.where("store").equals(store._id);
        const productData = await Product.where("storeId").equals(store._id);
        const sellData = await Sell.where("storeId").equals(store._id);
        const purchaseData = await Purchase.where("storeId").equals(store._id);

        return {
          purchaseAmount: purchaseData.length,
          sellAmount: sellData.length,
          ProductAmount: productData.length,
          storeManager: userData.map((user) => user.firstName),
          ...store._doc,
        };
      })
    );
    res.status(200).json(storesData);
  } catch (err) {
    next(err);
  }
};
