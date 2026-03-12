'use client';
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import MySubscription from '@/app/Subscriptions/MySubscription';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({ totalSubscribers: 0, activePlans: 0 });

 useEffect(() => {
  const loadDashboard = async () => {
    try {
      const userRes = await api.get('/users/me');
      setUser(userRes.data);
      
      if (userRes.data.role === 'admin') {
        const statsRes = await api.get('/admin/stats');
        setStats(statsRes.data);
      }
    } catch (err: any) {
      // THIS WILL SHOW YOU THE REAL ERROR IN THE CONSOLE
      console.error("DASHBOARD ERROR DETAILS:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        url: err.config?.url
      });
    }
  };
  loadDashboard();
}, []);


  return (
  <div className="p-8 max-w-7xl mx-auto space-y-8">
    <header className="flex justify-between items-end">
      <div>
        <h1 className="text-4xl font-black text-white">Console</h1>
        {/* Only show email if user exists */}
        <p className="text-gray-400">
          {user ? `Welcome back, ${user.email}` : "Fetching your profile..."}
        </p>
      </div>
      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold uppercase border border-green-500/30">
        System Online
      </span>
    </header>

    {user && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="space-y-6">
      {/* Account Info Card */}
      <div className="p-6 bg-[#1a1f2e] border border-gray-800 rounded-2xl shadow-sm">
        <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Account</h3>
        <p className="text-lg font-semibold text-white">{user.email}</p>
        <p className="text-sm text-blue-400 font-mono">Role: {user.role}</p>
      </div>

      {/* ADMIN PANEL: CRUD ACTIONS */}
      {user.role === 'admin' && (
        <div className="p-6 bg-purple-900/10 border border-purple-500/30 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-purple-400 uppercase">Admin CRUD Panel</h3>
          
          {/* Create Plan Button */}
          <button 
            onClick={async () => {
              const name = prompt("Plan Name (e.g. Pro)?");
              const price = prompt("Price (e.g. 50)?");
              const days = prompt("Duration in Days (e.g. 30)?");
              if (name && price && days) {
                try {
                  await api.post('/plans/', { name, price: Number(price), duration_days: Number(days) });
                  alert("Plan Created!");
                  window.location.reload(); 
                } catch (e) { alert("Failed to create plan"); }
              }
            }}
            className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded font-bold text-xs transition"
          >
            + CREATE NEW PLAN
          </button>

          {/* Logic for Stats (Already in your code) */}
          <div className="pt-4 border-t border-purple-500/20">
            <p className="text-xs text-gray-400">Total Subscribers: <span className="text-white">{stats.totalSubscribers}</span></p>
            <p className="text-xs text-gray-400">Active Plans: <span className="text-white">{stats.activePlans}</span></p>
          </div>
        </div>
      )}
    </div>

    {/* Subscription Section (Right side) */}
    <div className="md:col-span-2">
      <MySubscription />
    </div>
  </div>
  )}
  </div>
);
}
