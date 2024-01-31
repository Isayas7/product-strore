import Purchase from "../models/purchase.js";
import Category from "../models/category.js";
import User from "../models/user.js";
import Store from "../models/store.js";
// CREATE Purchase

export const createPurchase = async (req, res, next) => {
  try {
    const newPurchase = new Purchase(req.body);
    await newPurchase.save();
    res.status(200).send(newPurchase);
  } catch (err) {
    next(err);
  }
};

//UPDATE Purchase
export const updatePurchase = async (req, res, next) => {
  try {
    const updatedPurchase = await Purchase.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedPurchase);
  } catch (err) {
    next(err);
  }
};

//DELETE Purchase

export const deletePurchase = async (req, res, next) => {
  try {
    await Purchase.findByIdAndDelete(req.params.id);
    res.status(200).json("Purchase has been deleted");
  } catch (err) {
    next(err);
  }
};
//GET Purchase
export const getPurchase = async (req, res, next) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    res.status(200).json(purchase);
  } catch (err) {
    next(err);
  }
};

//GET Purchases

export const getPurchases = async (req, res, next) => {
  try {
    const purchases = await Purchase.find().sort({ createdAt: 1 });
    const purchasesData = await Promise.all(
      purchases.map(async (purchase) => {
        // const userData = await User.where("store").equals(purchase.storeId);

        const categoryData = await Category.findById(
          purchase.categoryId.toString()
        );
        const storeData = await Store.findById(purchase.storeId.toString());

        return {
          storeName: storeData.storeName,
          // manager: userData.map((user) => user.firstName),
          categoryName: categoryData.categoryName,
          ...purchase._doc,
        };
      })
    );
    res.status(200).json(purchasesData);
  } catch (err) {
    next(err);
  }
};
