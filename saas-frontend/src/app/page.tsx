"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import { getToken } from "@/utils/auth";
import { User } from "@/types";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getToken();
        if (!token) return;
        const res = await api.get<User>("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white/10 rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}