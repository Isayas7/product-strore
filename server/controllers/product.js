import Product from "../models/product.js";
import Category from "../models/category.js";
// CREATE Product

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).send(newProduct);
  } catch (err) {
    next(err);
  }
};

//UPDATE Product
export const updateProduct = async (req, res, next) => {
  try {
    const updatedAmount = req.body.amount;
    if (updatedAmount < 1) {
      return res
        .status(400)
        .json({ error: "Amount must be greater than or equal to 1" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

//DELETE Product

export const deleteProduct = async (req, res, next) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteProduct);
  } catch (err) {
    next(err);
  }
};
//GET Product
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const trend = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ selledTimes: -1 });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

//GET Products

// export const getProducts = async (req, res, next) => {
//   try {
//     const { productName, type, ...others } = req.query;
//     let query = others;
//     if (productName) {
//       query.productName = productName;
//     }
//     if (type) {
//       query.type = type;
//     }
//     const products = await Product.find(query);
//     res.status(200).json(products);
//   } catch (err) {
//     next(err);
//   }
// };

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find(req.query);
    const productData = await Promise.all(
      products.map(async (product) => {
        const categoryData = await Category.findById(
          product.categoryId.toString()
        );
        return {
          categoryName: categoryData.categoryName,
          ...product._doc,
        };
      })
    );
    res.status(200).json(productData);
  } catch (err) {
    next(err);
  }
};
