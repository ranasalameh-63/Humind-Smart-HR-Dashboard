const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    reviewer: String,
    score: { type: Number, min: 0, max: 100 },
    notes: String,
    criteria: {
    communication: Number,
    teamwork: Number,
    productivity: Number,
    reliability: Number,
  },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Performance", performanceSchema);
