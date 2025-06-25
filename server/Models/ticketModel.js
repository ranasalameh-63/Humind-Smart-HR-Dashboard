const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    subject: String,
    message: String,
    status: { type: String, enum: ["open", "in_progress", "resolved"], default: "open" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
