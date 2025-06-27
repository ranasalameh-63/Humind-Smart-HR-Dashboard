const express = require("express");
const router = express.Router();
const employeeController = require("../Controllers/employeeController");
const upload = require("../Middlewares/multer");

router.post("/add", upload.single("profileImage"), employeeController.addEmployee);
router.get("/all", employeeController.getAllEmployees);
router.patch("/update/:id", upload.single("profileImage"), employeeController.updateEmployee);
router.delete("/delete/:id", employeeController.deleteEmployee);

module.exports = router;
