const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['info', 'warning', 'success', 'error'],
      default: 'info',
    },
    read: {
      type: Boolean,
      default: false,
    },
    // Optional: link notification to a specific user if needed in future
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
