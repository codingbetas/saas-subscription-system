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

    {user && ( // Only render the details if we have user data
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#1a1f2e] border border-gray-800 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Account</h3>
          <p className="text-lg font-semibold text-white">{user.email}</p>
          <p className="text-sm text-blue-400 font-mono">Role: {user.role}</p>
        </div>
        <div className="md:col-span-2">
          <MySubscription />
        </div>
      </div>
    )}
  </div>
);
}
