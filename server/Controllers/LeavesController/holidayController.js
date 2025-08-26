const Holiday = require("../../Models/LeaveModels/holidayModel");

function normalizeDate(date) {
  const d = new Date(date);
  d.setHours(0,0,0,0);
  return d;
}

exports.createHoliday = async (req, res, next) => {
  try {
    const payload = { ...req.body, date: normalizeDate(req.body.date) };
    const h = await Holiday.create(payload);
    res.json(h);
  } catch (e) { next(e); }
};

exports.listHolidays = async (req, res, next) => {
  try {
    const { year } = req.query;
    const q = {};
    if (year) {
      const start = new Date(`${year}-01-01`); start.setHours(0,0,0,0);
      const end   = new Date(`${year}-12-31`); end.setHours(23,59,59,999);
      q.date = { $gte: start, $lte: end };
    }
    const list = await Holiday.find(q).sort({ date: 1 }).lean();
    res.json(list);
  } catch (e) { next(e); }
};
