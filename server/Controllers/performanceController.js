const Performance = require("../Models/performanceModel");
const Employee = require("../Models/employeeModel");
const { sendEmail } = require("../utils/emailService");

const addPerformance = async (req, res) => {
  try {
    const { employeeId, score, notes, criteria } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const newPerformance = new Performance({
      employee: employeeId,
      score,
      notes,
      criteria,
      date: new Date(),
    });

    await newPerformance.save();

    await sendEmail({
      to: employee.email,
      subject: "New Performance Evaluation",
      text: `Dear ${employee.name},\n\nYou have received a new performance evaluation.\n\nScore: ${score}\nNotes: ${notes}\n\nBest regards,\nHumind System`,
    });

    res.status(201).json({ message: "Performance added and email sent.", performance: newPerformance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add performance" });
  }
};

const getPerformanceLabel = (score) => {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Needs Improvement";
  return "Poor";
};

const getPerformanceOverview = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const records = await Performance.find({ employee: employeeId });

    if (records.length === 0)
      return res.json({ score: 0, performanceLabel: "No Data" });

    const avgScore = records.reduce((acc, r) => acc + r.score, 0) / records.length;
    const label = getPerformanceLabel(avgScore);

    res.json({ score: Math.round(avgScore), performanceLabel: label });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getPerformanceTimeline = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const performances = await Performance.find({ employee: employeeId }).sort("date");

    const timeline = performances.map(p => ({
      date: p.date,
      score: p.score,
    }));

    res.json(timeline);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStrengthsWeaknesses = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const performances = await Performance.find({ employee: employeeId });

    if (performances.length === 0) {
      return res.json({ strengths: [], weaknesses: [] });
    }

    const avgCriteria = {
      communication: 0,
      teamwork: 0,
      productivity: 0,
      reliability: 0
    };

    performances.forEach(p => {
      for (let key in avgCriteria) {
        avgCriteria[key] += p.criteria[key] || 0;
      }
    });

    for (let key in avgCriteria) {
      avgCriteria[key] /= performances.length;
    }

    const sorted = Object.entries(avgCriteria).sort((a, b) => b[1] - a[1]);

    const strengths = sorted.slice(0, 2).map(([k]) => k);
    const weaknesses = sorted.slice(-2).map(([k]) => k);

    res.json({ strengths, weaknesses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const compareWithPeers = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const allEmployees = await Employee.find({ department: employee.department });

    const employeeScores = await Promise.all(
      allEmployees.map(async emp => {
        const records = await Performance.find({ employee: emp._id });
        const avg = records.reduce((sum, r) => sum + r.score, 0) / (records.length || 1);
        return { employee: emp.name, score: Math.round(avg) };
      })
    );

    employeeScores.sort((a, b) => b.score - a.score);

    res.json(employeeScores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTrainingSuggestions = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const performances = await Performance.find({ employee: employeeId });

    if (!performances.length) return res.json({ suggestions: [] });

    const avg = {
      communication: 0,
      teamwork: 0,
      productivity: 0,
      reliability: 0
    };

    performances.forEach(p => {
      for (let key in avg) {
        avg[key] += p.criteria[key] || 0;
      }
    });

    for (let key in avg) {
      avg[key] /= performances.length;
    }

    const sorted = Object.entries(avg).sort((a, b) => a[1] - b[1]);

    const suggestions = sorted.slice(0, 2).map(([k]) => {
      return `Recommended training on ${k.charAt(0).toUpperCase() + k.slice(1)}`;
    });

    res.json({ suggestions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addPerformance,
  getPerformanceOverview,
  getPerformanceTimeline,
  getStrengthsWeaknesses,
  compareWithPeers,
  getTrainingSuggestions
};
