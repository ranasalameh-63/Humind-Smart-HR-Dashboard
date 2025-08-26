const mongoose = require("mongoose");

const leaveBalanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Types.ObjectId, ref: "Employee", required: true, index: true },
  policy: { type: mongoose.Types.ObjectId, ref: "LeavePolicy", required: true, index: true },
  year: { type: Number, required: true, index: true },
  balance: { type: Number, required: true },   
  carriedOver: { type: Number, default: 0 },   
  orgId: { type: mongoose.Types.ObjectId, index: true } 
}, { timestamps: true });

leaveBalanceSchema.index({ employee: 1, policy: 1, year: 1 }, { unique: true });

module.exports = mongoose.model("LeaveBalance", leaveBalanceSchema);
