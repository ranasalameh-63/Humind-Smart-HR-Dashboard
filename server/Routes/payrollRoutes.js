const express = require("express");
const router = express.Router();
const payrollController = require("../Controllers/payrollController");

router.post("/add", payrollController.createPayroll);

router.get("/get", payrollController.getAllPayrolls);

router.put("/edit/:id", payrollController.updatePayroll);

router.delete("/softDel/:id", payrollController.deletePayroll);

module.exports = router;
