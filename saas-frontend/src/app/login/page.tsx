"use client";
import { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Attempting Login...");

  try {
    // Create Form Data (FastAPI OAuth2 Standard)
    const formData = new FormData();
    formData.append("username", email); // Use 'username' key for your email
    formData.append("password", password);

    const res = await api.post("/auth/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Tell backend this is a form
      },
    });

    // 1. Get the token from response (FastAPI uses access_token)
    const token = res.data.access_token;
    
    // 2. Save it exactly as 'token' for api.ts to find
    localStorage.setItem("token", token);
    
    console.log("Login Successful! Token saved.");
    router.push("/dashboard");

  } catch (err: any) {
    console.error("Login Failed:", err.response?.data || err.message);
    alert("Login failed: " + (err.response?.data?.detail || "Check console"));
  }
};


  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white/10 rounded-2xl shadow-xl border border-white/5">
      <h2 className="text-2xl font-bold mb-6 text-white">Sign In</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 rounded bg-black/20 text-white border border-white/10 focus:outline-none focus:border-purple-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-black/20 text-white border border-white/10 focus:outline-none focus:border-purple-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button 
          type="submit" 
          className="w-full bg-purple-600 p-3 rounded-lg font-bold hover:bg-purple-500 transition-colors"
        >
          Login to Console
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-400 text-center">
        Don't have an account? <a href="/register" className="text-purple-400 hover:underline">Register</a>
      </p>
    </div>
  );
}


