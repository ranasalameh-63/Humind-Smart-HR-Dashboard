const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    startDate: Date,
    endDate: Date,
    status: { type: String, enum: ["pending", "ongoing", "completed"], default: "pending" },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Training", trainingSchema);
