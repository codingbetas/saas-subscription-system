'use client';
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import { Plan, Subscription } from '@/types'; // Ensure this matches your file path

export default function MySubScription() {
  const [mySub, setMySub] = useState<Subscription | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]); // FIXED: No more 'never[]' error
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);

    // 1. Fetch Subscription status
    try {
      const subRes = await api.get('/subscription/my-subscription/');
      setMySub(subRes.data);
    } catch (err: any) {
      if (err.response?.status === 401) router.push('/login');
      setMySub(null); 
    }

    // 2. Fetch Available Plans
    try {
      const plansRes = await api.get('/plans/');
      if (Array.isArray(plansRes.data)) {
        setPlans(plansRes.data);
      } else {
        setPlans([]); 
      }
    } catch (err) {
      console.error("Failed to fetch plans list");
      setPlans([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAction = async (planId: number, isUpgrade: boolean) => {
    try {
      const endpoint = isUpgrade 
        ? `/subscription/upgrade/${planId}` 
        : `/subscription/subscribe/${planId}`;
      
      await api.post(endpoint);
      alert(isUpgrade ? "Plan Upgraded!" : "Subscribed Successfully!");
      fetchData(); 
    } catch (err: any) {
      alert(err.response?.data?.detail || "Action failed");
    }
  };

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel?")) return;
    try {
      await api.post('/subscription/cancel');
      alert("Subscription Cancelled");
      fetchData();
    } catch (err) {
      alert("Failed to cancel");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading your membership...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* SECTION 1: Current Status */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2 text-white">Subscription Overview</h1>
        {mySub ? (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="opacity-80">Current Status</p>
              <h2 className="text-2xl font-semibold">Active Member (Plan #{mySub.plan_id})</h2>
              <p className="mt-2 text-blue-100">
                Your cycle ends on: <strong>{new Date(mySub.end_date).toLocaleDateString()}</strong>
              </p>
            </div>
            <button 
              onClick={handleCancel}
              className="bg-white/10 hover:bg-white/20 border border-white/30 px-6 py-2 rounded-full transition text-white"
            >
              Cancel Subscription
            </button>
          </div>
        ) : (
          <div className="py-4">
            <h2 className="text-2xl font-semibold">No Active Subscription</h2>
            <p className="text-blue-100">Choose a plan below to unlock premium features.</p>
          </div>
        )}
      </section>

      {/* SECTION 2: Plan Selection */}
      <section>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Available Plans</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan: Plan) => { // Type-safe mapping
            const isCurrentPlan = mySub?.plan_id === plan.id;
            return (
              <div key={plan.id} className={`p-6 rounded-2xl border-2 transition ${isCurrentPlan ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-white'}`}>
                <h4 className="text-xl font-bold mb-2 text-gray-800">{plan.name}</h4>
                <div className="text-4xl font-black mb-4 text-gray-900">${plan.price}<span className="text-sm font-normal text-gray-500"> / {plan.duration_days} days</span></div>
                
                <ul className="space-y-3 mb-8 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">✅ Full API Access</li>
                  <li className="flex items-center gap-2">✅ 24/7 Support</li>
                </ul>

                <button
                  disabled={isCurrentPlan}
                  onClick={() => handleAction(plan.id, !!mySub)}
                  className={`w-full py-3 rounded-xl font-bold transition ${
                    isCurrentPlan 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                  }`}
                >
                  {isCurrentPlan ? 'Current Plan' : (mySub ? 'Upgrade' : 'Get Started')}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}