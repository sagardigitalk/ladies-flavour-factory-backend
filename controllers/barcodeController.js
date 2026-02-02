const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// @desc    Get products for barcode generation
// @route   GET /api/barcodes/products
// @access  Private
const getBarcodeProducts = asyncHandler(async (req, res) => {
  const { keyword } = req.query;
  const query = {};

  if (keyword) {
    query.$or = [
      { name: { $regex: keyword, $options: 'i' } },
      { sku: { $regex: keyword, $options: 'i' } },
    ];
  }

  // Select only necessary fields for barcodes
  const products = await Product.find(query).select('name sku unitPrice _id');

  res.json(products);
});

module.exports = {
  getBarcodeProducts,
};
