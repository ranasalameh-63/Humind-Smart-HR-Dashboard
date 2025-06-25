// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from './components/Footer';

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// // صفحات المشروع
// import Home from "./pages/HomePage/home";
// import Dashboard from "./pages/DashboardPage/Dashboard";
// import Performance from "./pages/PerformancePage/PerformancePage";
// import Trainings from "./pages/TrainingSuggestionsPage/TrainingSuggestionsPage";
// import ChurnRisk from "./pages/ChurnRiskPage/ChurnRiskPage";
// import EmployeeProfile from "./pages/EmployeeProfilePage/EmployeeProfilePage";
// import EmployeesManagement from "./pages/EmployeesManagementPage/EmployeesManagementPage";
// import TicketsPage from "./pages/TicketsPage/TicketsPage";
// import Settings from "./pages/Settings/SystemConfigPage";
// import Login from "./pages/LoginPage/LoginPage";
// import RegisterPage from "./pages/RegisterPage/RegisterPage";


// function Layout({ children }) {
//   const location = useLocation();
//   const hideNavbarAndFooter = ['/login', '/register'

//   ].includes(location.pathname);

//   return (
//     <div>
//       {!hideNavbarAndFooter && <Navbar />}
//       {children}
//       {!hideNavbarAndFooter && <Footer />}
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="p-6 bg-gray-50 min-h-screen">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/performance" element={<Performance />} />
//           <Route path="/trainings" element={<Trainings />} />
//           <Route path="/churn" element={<ChurnRisk />} />
//           <Route path="/employeeProfile" element={<EmployeeProfile />} />
//           <Route path="/employeesManagement" element={<EmployeesManagement />} />
//           <Route path="/ticketsPage" element={<TicketsPage />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<RegisterPage />} />

//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Home from "./pages/HomePage/home";
import Dashboard from "./pages/DashboardPage/Dashboard";
import Performance from "./pages/PerformancePage/PerformancePage";
import Trainings from "./pages/TrainingSuggestionsPage/TrainingSuggestionsPage";
import ChurnRisk from "./pages/ChurnRiskPage/ChurnRiskPage";
import EmployeeProfile from "./pages/EmployeeProfilePage/EmployeeProfilePage";
import EmployeesManagement from "./pages/EmployeesManagementPage/EmployeesManagementPage";
import TicketsPage from "./pages/TicketsPage/TicketsPage";
import Settings from "./pages/Settings/SystemConfigPage";
import Login from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function Layout({ children }) {
  const location = useLocation();
  const hideNavbarAndFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <div className="min-h-screen">{children}</div>
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="/churn" element={<ChurnRisk />} />
          <Route path="/employeeProfile" element={<EmployeeProfile />} />
          <Route path="/employeesManagement" element={<EmployeesManagement />} />
          <Route path="/ticketsPage" element={<TicketsPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

