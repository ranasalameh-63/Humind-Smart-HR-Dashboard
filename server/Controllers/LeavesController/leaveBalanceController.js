const LeaveBalance = require("../../Models/LeaveModels/leaveBalanceModel");

exports.seedBalance = async (req, res, next) => {
  try {
    const { year, policyId, employeeId, initialBalance, carriedOver = 0 } = req.body;
    if (!year || !policyId || !employeeId || initialBalance == null)
      return res.status(400).json({ message: "Missing required fields" });

    const exists = await LeaveBalance.findOne({ employee: employeeId, policy: policyId, year });
    if (exists) return res.status(409).json({ message: "Balance already exists" });

    const doc = await LeaveBalance.create({
      employee: employeeId,
      policy: policyId,
      year,
      balance: initialBalance,
      carriedOver
    });

    res.json(doc);
  } catch (e) { next(e); }
};

exports.getEmployeeBalances = async (req, res, next) => {
  try {
    const list = await LeaveBalance
      .find({ employee: req.params.employeeId })
      .populate("policy", "name yearlyAllowance")
      .lean();
    res.json(list);
  } catch (e) { next(e); }
};
