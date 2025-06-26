const express = require("express");
const router = express.Router();
const employeeController = require("../Controllers/employeeController");

router.post("/add", employeeController.addEmployee);
router.get("/all", employeeController.getAllEmployees);
router.patch("/update/:id", employeeController.updateEmployee);
router.delete("/delete/:id", employeeController.deleteEmployee);

module.exports = router;
