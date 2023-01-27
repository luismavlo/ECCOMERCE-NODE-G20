const Category = require('../models/category.model');

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.create({ name });

    res.status(201).json({
      status: 'success',
      message: 'Category created successfully',
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.findCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: {
        status: true,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Categories fetched successfully',
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.findCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Category fetched successfully',
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.updateCategory = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.deleteCategory = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
