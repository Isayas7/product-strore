import Category from "../models/category.js";

// CREATE Category

export const createCategory = async (req, res, next) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).send(newCategory);
  } catch (err) {
    next(err);
  }
};

//UPDATE Category
export const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

//DELETE Category

export const deleteCategory = async (req, res, next) => {
  try {
    const deleteCategory = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteCategory);
  } catch (err) {
    next(err);
  }
};
//GET Category
export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.where("userId").equals(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

//GET Catagories

export const getCategories = async (req, res, next) => {
  try {
    const { categoryName, ...others } = req.query;
    let query = others;
    if (categoryName) {
      query.categoryName = categoryName;
    }
    const categories = await Category.find(query).sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};
