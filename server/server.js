require("dotenv").config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length);

const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/DB");
const cookiesParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");


const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);


// Routes
const userRoutes = require('./Routes/usersRoute');
const employeeRoutes = require('./Routes/employeeRoutes');
const performanceRoutes = require('./Routes/performanceRoutes');
const resetPasswordRoutes = require('./Routes/resetPasswordRoutes');


// Middleware
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
app.use("/api/users", userRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/performance", performanceRoutes);
app.use('/api/auth', resetPasswordRoutes);


app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Connect to MongoDB using connectDB function
connectDB();

// Start Server
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));