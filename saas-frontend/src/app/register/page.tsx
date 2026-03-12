"use client";
import { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

 const register = async () => {
  console.log("1. Register button clicked!"); // Check if this shows up
  try {
    console.log("2. Sending data to:", api.defaults.baseURL + "/users/");
    const res = await api.post("/users/", { email, password });
    
    console.log("3. Success!", res.data);
    alert("User registered successfully!");
    router.push("/login"); // Make sure this route exists!
  } catch (err: any) {
    console.error("4. Error caught:", err);
    alert(err.response?.data?.detail || "Registration failed");
  }
 };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white/10 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 mb-3 rounded bg-white/10"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 mb-3 rounded bg-white/10"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={register}
        className="w-full bg-purple-600 p-3 rounded hover:bg-purple-500"
      >
        Register
      </button>
    </div>
  );
}