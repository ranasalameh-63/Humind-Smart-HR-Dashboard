import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:9000/api/users/register",
        {
          name,
          email,
          password,
          role: "hr", 
        },
        { withCredentials: true }
      );

      toast.success("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEEEEE] px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-[#3B1E54]">Create Account</h2>

        <div className="space-y-2">
          <label className="block text-[#3B1E54] font-medium">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[#3B1E54] font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[#3B1E54] font-medium">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[#3B1E54] font-medium">Confirm Password</label>
          <input
            type="password"
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9B7EBD]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#3B1E54] text-white py-3 rounded-xl font-semibold hover:bg-[#9B7EBD] transition"
        >
          Register
        </button>
        <p className="text-center text-[#3B1E54] mt-4">
  Already have an account?{" "}
  <a href="/login" className="text-[#9B7EBD] hover:underline">
    Login
  </a>
</p>

      </form>
    </div>
  );
}
