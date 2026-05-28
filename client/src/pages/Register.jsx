import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      return toast.error("Please fill all fields");
    }

    if (formData.password.length < 6) {
      return toast.error(
        "Password must be at least 6 characters"
    );
    }

    try {
      setLoading(true);

      const data = await registerUser(formData);

      login(data);

      setFormData({
       name: "",
       email: "",
       password: "",
  });

      toast.success("Registration successful");

      navigate("/dashboard");
    
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>

          <p className="text-gray-500">
            Start managing your tasks today
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          autoComplete="off"
        >
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="new-password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}            
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-purple-600 font-medium"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            {loading
              ? "Creating account..."
              : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-purple-600 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;