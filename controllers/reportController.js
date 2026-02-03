const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit-table');

// @desc    Get inventory report with stats
// @route   GET /api/reports/inventory
// @access  Private
const getInventoryReport = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate('catalog', 'name');

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

// @desc    Export inventory to Excel
// @route   GET /api/reports/inventory/excel
// @access  Private
const exportInventoryExcel = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate('catalog', 'name');

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Inventory');

  worksheet.columns = [
    { header: 'Catalog', key: 'catalog', width: 20 },
    { header: 'Product Name', key: 'name', width: 30 },
    { header: 'SKU', key: 'sku', width: 20 },
  ];

  products.forEach(product => {
    worksheet.addRow({
      catalog: product.catalog?.name || '-',
      name: product.name,
      sku: product.sku,
    });
  });

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=' + 'inventory_report.xlsx'
  );

  await workbook.xlsx.write(res);
  res.end();
});

// @desc    Export inventory to PDF
// @route   GET /api/reports/inventory/pdf
// @access  Private
const exportInventoryPDF = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate('catalog', 'name');

  const doc = new PDFDocument({ margin: 30, size: 'A4' });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=inventory_report.pdf');

  doc.pipe(res);

  doc.fontSize(18).text('Inventory Report', { align: 'center' });
  doc.moveDown();

  const table = {
    title: "",
    headers: ["Catalog", "Product Name", "SKU", "Stock"],
    rows: products.map(p => [
      p.catalog?.name || '-',
      p.name,
      p.sku,
      p.stockQuantity,
    ]),
  };

  await doc.table(table, {
    prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
    prepareRow: (row, i, isOdd, isLastRow) => doc.font("Helvetica").fontSize(10),
  });

  doc.end();
});

module.exports = {
  getInventoryReport,
  exportInventoryExcel,
  exportInventoryPDF,
};
