const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// @desc    Get inventory report with stats
// @route   GET /api/reports/inventory
// @access  Private
const getInventoryReport = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate('category', 'name');

  const totalStockValue = products.reduce((acc, p) => acc + (p.stockQuantity * p.costPrice), 0);
  const lowStockCount = products.filter(p => p.stockQuantity < 10).length;
  const totalItems = products.reduce((acc, p) => acc + p.stockQuantity, 0);

  // You might want to format the product list specifically for the report if needed
  // For now, returning the raw product list plus stats
  res.json({
    stats: {
      totalStockValue,
      lowStockCount,
      totalItems,
    },
    products
  });
});

module.exports = {
  getInventoryReport,
};
