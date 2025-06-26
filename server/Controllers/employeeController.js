const Employee = require("../Models/employeeModel");

// Add employee (by HR manually, so auto-approved)
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, position, department, phone,status } = req.body;

    const newEmployee = new Employee({
      name,
      email,
      position,
      department,
      phone,
      status,
      isDeleted: false
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// View all employees (only approved and not deleted)
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ isDeleted: false });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit employee data
exports.updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Employee not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Soft Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!deleted) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee soft-deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


