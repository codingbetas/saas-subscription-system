'use client';
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import { Plan, Subscription } from '@/types'; // Import your types here

export default function MySubScription() {
  // Use specific types instead of 'any' to make it "Pro"
  const [mySub, setMySub] = useState<Subscription | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]); 
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [days, setDays] = useState(30);

  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const subRes = await api.get('/subscription/my-subscription');
      setMySub(subRes.data);
    } catch (err: any) {
      if (err.response?.status === 401) router.push('/login');
      setMySub(null);
    }

    try {
      const plansRes = await api.get('/plans/');
      if (Array.isArray(plansRes.data)) {
        setPlans(plansRes.data);
      } else {
        setPlans([]);
      }
    } catch (err) {
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/plans/', {
      name: name,
      price: Number(price),
      duration_days: Number(days)
    });

      fetchData(); // Refresh the list after creating
    } catch (err) {
      alert("Failed to create plan. Are you logged in?");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading plans...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Plan Management</h1>
      
      {/* Create Plan Form */}
      <form onSubmit={handleCreatePlan} className="mb-8 p-6 border rounded-xl bg-gray-800/50">
      <input 
      placeholder="Plan Name" 
      onChange={(e) => setName(e.target.value)} 
      className="p-2 mr-2 rounded bg-black/20"
      />
      <input 
      type="number" 
      placeholder="Price" 
      onChange={(e) => setPrice(Number(e.target.value))} 
      className="p-2 mr-2 rounded bg-black/20"
      />
      <button type="submit" className="bg-purple-600 px-4 py-2 rounded">Create Plan</button>
      <input 
      type="number"
      placeholder="Days"
      className="p-2 rounded bg-black/40 text-white w-24"
      onChange={(e) => setDays(Number(e.target.value))}
      value={days}
      />
      </form>


      {/* Plans List */}
      <div className="grid gap-4">
        {plans.length === 0 ? (
           <p className="text-gray-500">No plans found. Create one above!</p>
        ) : (
          plans.map((plan: any) => (
            <div key={plan.id} className="p-4 border rounded-xl shadow-sm flex justify-between items-center bg-white">
              <div>
                <h3 className="font-bold text-lg">{plan.name}</h3>
                <p className="text-gray-600">${plan.price} for {plan.duration_days} days</p>
              </div>
              <button 
                onClick={() => api.post(`/subscription/subscribe/${plan.id}`)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Subscribe
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}