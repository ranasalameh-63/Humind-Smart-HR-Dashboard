const Employee = require("../Models/employeeModel");
const cloudinary = require("../Config/cloudinary");

// إضافة موظف 
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, phone, department, position, status } = req.body;
    let profileImageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "humind/employees",
      });
      profileImageUrl = result.secure_url;
    }

    const newEmployee = new Employee({
      name,
      email,
      phone,
      department,
      position,
      status,
      profileImage: profileImageUrl,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// عرض جميع الموظفين 
exports.getAllEmployees = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      department,
      status,
    } = req.query;

    const filters = { isDeleted: false };

    // Filtering
    if (search) filters.name = { $regex: search, $options: "i" };
    if (department) filters.department = department;
    if (status) filters.status = status;


    // Pagination
    const skip = (page - 1) * limit;

    const [employees, total] = await Promise.all([
      Employee.find(filters)
        .skip(skip)
        .limit(Number(limit)),
      Employee.countDocuments(filters),
    ]);

    res.json({
      data: employees,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "humind/employees",
      });
      updateData.profileImage = result.secure_url;
    }

    const updated = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Employee not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// (Soft Delete) 
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

exports.getActiveEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ isDeleted: false, status: "active" });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



