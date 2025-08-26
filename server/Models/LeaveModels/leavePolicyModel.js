const mongoose = require("mongoose");

const leavePolicySchema = new mongoose.Schema({
  name: { type: String, required: true },           
  yearlyAllowance: { type: Number, required: true },
  carryOver: { type: Number, default: 0 },          
  requiresDocument: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("LeavePolicy", leavePolicySchema);
