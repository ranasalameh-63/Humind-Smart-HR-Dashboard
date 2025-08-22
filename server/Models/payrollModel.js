const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema(
{
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  baseSalary: { type: Number, required: true },
  bonuses: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  totalPay: { type: Number },
  month: { type: String, required: true }, 
  paymentDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
  isDeleted: { type: Boolean, default: false },

}
);

module.exports = mongoose.model("payroll", performanceSchema);
