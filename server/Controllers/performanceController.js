import { sendEmail } from "../utils/emailService.js";
import Employee from "../Models/employeeModel.js";

export const addPerformance = async (req, res) => {
  const { employeeId, score, notes } = req.body;

  const employee = await Employee.findById(employeeId);
  if (!employee) return res.status(404).json({ message: "Employee not found" });

  await sendEmail({
    to: employee.email,
    subject: "New Performance Evaluation",
    text: `Dear ${employee.name}, you have a new performance evaluation with score ${score}. Notes: ${notes}`,
  });

  // رد نجاح
  res.status(201).json({ message: "Performance added and email sent." });
};
