const express = require("express");
const {
  addPerformance,
  getEmployeesWithPerformance,
  getPerformanceOverview,
  getPerformanceTimeline,
  getStrengthsWeaknesses,
  compareWithPeers,
  getTrainingSuggestions,
} = require("../Controllers/performanceController");

const router = express.Router();

// Add new performance evaluation
router.post("/add", addPerformance);

// get employees whose have performance evaluation
router.get("/with-evaluation", getEmployeesWithPerformance);

// Performance overview
router.get("/overview/:employeeId", getPerformanceOverview);

// Performance timeline chart
router.get("/timeline/:employeeId", getPerformanceTimeline);

// Strengths and weaknesses
router.get("/strengths-weaknesses/:employeeId", getStrengthsWeaknesses);

// Peer comparison
router.get("/compare/:employeeId", compareWithPeers);

// Suggested training programs
router.get("/training/:employeeId", getTrainingSuggestions);


module.exports = router;
