const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    department: String,
    position: String,
    profileImage: String,
    status: { type: String, enum: ["active", "on_leave", "terminated"], default: "active" },
    startDate: Date,
    performanceScores: [{ type: mongoose.Schema.Types.ObjectId, ref: "Performance" }],
    trainings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Training" }],
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
