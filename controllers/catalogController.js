const asyncHandler = require('express-async-handler');
const Catalog = require('../models/catalogModel');

// @desc    Get all catalogs
// @route   GET /api/catalogs
// @access  Private
const getCatalogs = asyncHandler(async (req, res) => {
  const catalogs = await Catalog.find({});
  res.json(catalogs);
});

// @desc    Create a catalog
// @route   POST /api/catalogs
// @access  Private/Admin
const createCatalog = asyncHandler(async (req, res) => {
  const { name, code } = req.body;

  const catalogExists = await Catalog.findOne({ code });

  if (catalogExists) {
    res.status(400);
    throw new Error('Catalog code already exists');
  }

  const catalog = await Catalog.create({
    name,
    code,
  });

  if (catalog) {
    res.status(201).json(catalog);
  } else {
    res.status(400);
    throw new Error('Invalid catalog data');
  }
});

// @desc    Update a catalog
// @route   PUT /api/catalogs/:id
// @access  Private/Admin
const updateCatalog = asyncHandler(async (req, res) => {
  const { name, code } = req.body;

  const catalog = await Catalog.findById(req.params.id);

  if (catalog) {
    catalog.name = name || catalog.name;
    catalog.code = code || catalog.code;

    const updatedCatalog = await catalog.save();
    res.json(updatedCatalog);
  } else {
    res.status(404);
    throw new Error('Catalog not found');
  }
});

// @desc    Delete a catalog
// @route   DELETE /api/catalogs/:id
// @access  Private/Admin
const deleteCatalog = asyncHandler(async (req, res) => {
  const catalog = await Catalog.findById(req.params.id);

  if (catalog) {
    await catalog.deleteOne();
    res.json({ message: 'Catalog removed' });
  } else {
    res.status(404);
    throw new Error('Catalog not found');
  }
});

module.exports = {
  getCatalogs,
  createCatalog,
  updateCatalog,
  deleteCatalog,
};