"use client"
import "./globals.css"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation" // Added useRouter

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const router = useRouter() // Initialize router

  // --- LOGOUT FUNCTION ---
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    router.push("/login"); // Redirect to login page
    router.refresh(); // Refresh to clear any auth state
  };

  return (
    <html lang="en">
      <body className="bg-slate-900 text-white min-h-screen">
        <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
          <h1 className="text-xl font-bold tracking-tight">SaaS System</h1>
          <div className="flex items-center gap-6">
            <Link className={path === "/login" ? "underline font-bold" : ""} href="/login">Login</Link>
            <Link className={path === "/register" ? "underline font-bold" : ""} href="/register">Register</Link>
            <Link className={path === "/dashboard" ? "underline font-bold" : ""} href="/dashboard">Dashboard</Link>
            <Link className={path === "/plans" ? "underline font-bold" : ""} href="/plans">Plans</Link>
            
            {/* --- LOGOUT BUTTON --- */}
            <button 
              onClick={handleLogout}
              className="ml-4 px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/30 rounded text-xs font-bold uppercase transition"
            >
              Logout
            </button>
          </div>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
