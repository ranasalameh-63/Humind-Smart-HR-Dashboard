const express = require("express");
const router = express.Router();


// Controllers
const { createPolicy, listPolicies } = require("../Controllers/LeavesController/leavePolicyController");
const { createHoliday, listHolidays } = require("../Controllers/LeavesController/holidayController");
const { seedBalance, getEmployeeBalances } = require("../Controllers/LeavesController/leaveBalanceController");
const { createRequest, listMine, listAll, updateStatus } = require("../Controllers/LeavesController/z");

// Policies
router.post("/policies", createPolicy);
router.get("/policies", listPolicies);

// Holidays
router.post("/holidays", createHoliday);
router.get("/holidays", listHolidays);

// Balances
router.post("/balances/seed", seedBalance);
router.get("/balances/:employeeId", getEmployeeBalances);

// Requests
router.post("/", createRequest);                       
router.get("/", listAll);     
router.get("/mine", listMine);                          
router.patch("/:id/status", updateStatus);

module.exports = router;
