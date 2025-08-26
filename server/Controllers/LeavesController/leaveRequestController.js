const LeaveRequest = require("../../Models/LeaveModels/leaveRequestModel");
const LeaveBalance = require("../../Models/LeaveModels/leaveBalanceModel");
const Holiday = require("../../Models/LeaveModels/holidayModel");
const { businessDaysBetween } = require("../../Utils/businessDays");

function normalizeDate(date) { const d = new Date(date); d.setHours(0,0,0,0); return d; }

async function getHolidaysBetween(start, end) {
  return (await Holiday.find({ date: { $gte: start, $lte: end } }).lean()).map(h => h.date);
}

exports.createRequest = async (req, res, next) => {
  try {
    const { policyId, startDate, endDate, reason, attachmentUrl } = req.body;
    if (!policyId || !startDate || !endDate)
      return res.status(400).json({ message: "policyId, startDate, endDate are required" });

    const start = normalizeDate(startDate);
    const end   = normalizeDate(endDate);

    // منع التداخل لموظفك
    const overlap = await LeaveRequest.findOne({
      employee: req.user._id,
      isDeleted: false,
      status: { $in: ["pending", "approved"] },
      $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
    });
    if (overlap) return res.status(409).json({ message: "Overlapping leave request exists" });

    // جلب العطل ضمن النطاق
    const holidays = await getHolidaysBetween(start, end);

    // حساب أيام العمل
    const days = await businessDaysBetween(start, end, holidays);
    if (days <= 0) return res.status(400).json({ message: "No business days in selected range" });

    // تحقّق الرصيد (سنة البداية)
    const year = start.getFullYear();
    const bal = await LeaveBalance.findOne({ employee: req.user._id, policy: policyId, year });
    if (!bal || bal.balance < days) return res.status(400).json({ message: "Insufficient balance" });

    const request = await LeaveRequest.create({
      employee: req.user._id,
      policy: policyId,
      startDate: start,
      endDate: end,
      days,
      reason,
      attachmentUrl
    });

    res.json(request);
  } catch (e) { next(e); }
};

exports.listMine = async (req, res, next) => {
  try {
    const list = await LeaveRequest
      .find({ employee: req.user._id, isDeleted: false })
      .sort({ createdAt: -1 })
      .lean();
    res.json(list);
  } catch (e) { next(e); }
};

exports.listAll = async (req, res, next) => {
  try {
    const { status } = req.query;
    const q = { isDeleted: false };
    if (status) q.status = status;

    const list = await LeaveRequest
      .find(q)
      .sort({ createdAt: -1 })
      .limit(200)
      .populate("employee", "name department")
      .populate("policy", "name")
      .lean();

    res.json(list);
  } catch (e) { next(e); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body; // approved / rejected / cancelled
    if (!["approved", "rejected", "cancelled"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const reqDoc = await LeaveRequest.findById(req.params.id);
    if (!reqDoc) return res.status(404).json({ message: "Request not found" });

    if (reqDoc.status !== "pending" && status !== "cancelled")
      return res.status(400).json({ message: "Only pending requests can be approved/rejected" });

    // خصم/استرجاع الرصيد
    if (status === "approved") {
      const year = reqDoc.startDate.getFullYear();
      const bal = await LeaveBalance.findOne({ employee: reqDoc.employee, policy: reqDoc.policy, year });
      if (!bal || bal.balance < reqDoc.days)
        return res.status(400).json({ message: "Insufficient balance at approval time" });
      bal.balance -= reqDoc.days;
      await bal.save();
    }

    if (status === "cancelled" && reqDoc.status === "approved") {
      const year = reqDoc.startDate.getFullYear();
      const bal = await LeaveBalance.findOne({ employee: reqDoc.employee, policy: reqDoc.policy, year });
      if (bal) { bal.balance += reqDoc.days; await bal.save(); }
    }

    reqDoc.status = status;
    reqDoc.approver = req.user._id;
    await reqDoc.save();

    res.json(reqDoc);
  } catch (e) { next(e); }
};
