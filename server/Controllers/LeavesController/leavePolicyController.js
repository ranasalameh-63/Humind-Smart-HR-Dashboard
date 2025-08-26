const LeavePolicy = require("../../Models/LeaveModels/leavePolicyModel");

exports.createPolicy = async (req, res, next) => {
  try {
    const policy = await LeavePolicy.create(req.body);
    res.json(policy);
  } catch (e) { next(e); }
};

exports.listPolicies = async (req, res, next) => {
  try {
    const list = await LeavePolicy.find({}).sort({ createdAt: -1 }).lean();
    res.json(list);
  } catch (e) { next(e); }
};
