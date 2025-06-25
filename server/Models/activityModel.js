const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    type: String, // e.g., "add", "update", "delete"
    message: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);