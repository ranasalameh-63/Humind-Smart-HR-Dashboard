require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/DB");
const cookiesParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");


const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);


// Routes
const userRoutes = require('./Routes/usersRoute');
const employeeRoutes = require('./Routes/employeeRoutes');
const performanceRoutes = require('./Routes/performanceRoutes');
const payrollRoutes = require('./Routes/payrollRoutes')
const resetPasswordRoutes = require('./Routes/resetPasswordRoutes');


// Middleware
app.use(helmet());
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 300, 
  message: "Too many requests, please try again later.",
});
app.use(bodyParser.json());
app.use(cookiesParser());
app.use(
  cors({
    origin: (_, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Routes
app.use("/api", apiLimiter);
app.use("/api/users", userRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/payroll", payrollRoutes);
app.use('/api/auth', resetPasswordRoutes);


app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Connect to MongoDB using connectDB function
connectDB();

// Start Server
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));