const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema({
  employee: { type: mongoose.Types.ObjectId, ref: "Employee", required: true, index: true },
  policy: { type: mongoose.Types.ObjectId, ref: "LeavePolicy", required: true },
  startDate: { type: Date, required: true, index: true },
  endDate: { type: Date, required: true, index: true },
  days: { type: Number, required: true }, 
  reason: String,
  attachmentUrl: String, 
  status: { type: String, enum: ["pending","approved","rejected","cancelled"], default: "pending", index: true },
  approver: { type: mongoose.Types.ObjectId, ref: "User" },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

leaveRequestSchema.index({ employee: 1, startDate: 1, endDate: 1 });

module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);
