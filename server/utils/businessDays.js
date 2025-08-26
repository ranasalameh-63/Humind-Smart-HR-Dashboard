// حدد أيام الويكند حسب بلدك (هون: الجمعة=5، السبت=6)
const isWeekend = (d) => {
  const day = d.getDay();
  return day === 5 || day === 6;  // جمعة وسبت
};

function normalizeDate(date) {
  const d = new Date(date);
  d.setHours(0,0,0,0);
  return d;
}

// startDate و endDate تاريخين
// holidays: Array من تواريخ العطل الرسمية
async function businessDaysBetween(startDate, endDate, holidays = []) {
  const start = normalizeDate(startDate);
  const end = normalizeDate(endDate);
  if (end < start) return 0;

  const holidaySet = new Set(holidays.map(d => normalizeDate(d).getTime()));
  let count = 0;

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const day = new Date(d);
    if (isWeekend(day)) continue;
    if (holidaySet.has(normalizeDate(day).getTime())) continue;
    count++;
  }
  return count;
}

module.exports = { businessDaysBetween, normalizeDate };
