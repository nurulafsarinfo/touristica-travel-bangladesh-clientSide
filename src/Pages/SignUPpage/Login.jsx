import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import loginImg from "../../assets/Undraw Traveling.svg"; // যে ইমেজ রেজিস্ট্রেশনে ইউজ করেছো
import SocialLogin from "./SocialLogin";
import useAxios from "../../Hooks/useAxios";

const Login = () => {
  const { signIn } = useAuth();
  const axiosPublic = useAxios();
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;



    axiosPublic.post('/jwt', {email: email})
      .then(res => {
        if(res.data.token) {
          localStorage.setItem('access-token', res.data.token);
          navigate(from, { replace: true });
        };
      });




    try {
      signIn(email, password).then((result) => {
        console.log("User signed in", result.user);
        navigate(from, { replace: true });
      });
    } catch (err) {
      setError("Invalid email or password!");
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#d1dbff] via-white to-[#d1dbff] flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl grid lg:grid-cols-2 gap-10 max-w-6xl w-full p-8">
        {/* Illustration */}
        <div className="hidden lg:flex items-center justify-center">
          <img src={loginImg} alt="Login Illustration" className="w-[80%]" />
        </div>

        {/* Login Form */}
        <div className="w-full">
          <h2 className="text-3xl font-bold text-[#0ea5e9] mb-2">Welcome Back!</h2>
          <p className="mb-6 text-secondary">Login to explore your journey with Touristica.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@mail.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="btn bg-[#0ea5e9] w-full text-white">
              Login
            </button>

            <p className="text-sm mt-2 text-center">
              Don’t have an account?{" "}
              <a href="/register" className="text-secondary hover:underline">
                Register here
              </a>
            </p>
          </form>
        </div>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
