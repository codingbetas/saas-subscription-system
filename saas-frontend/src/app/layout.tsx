"use client"
import "./globals.css"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()

  return (
    <html lang="en">
      <body className="bg-slate-900 text-white min-h-screen">
        <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <h1 className="text-xl font-bold">SaaS System</h1>
          <div className="flex gap-4">
            <Link className={path === "/" ? "underline" : ""} href="/">Login</Link>
            <Link className={path === "/register" ? "underline" : ""} href="/register">Register</Link>
            <Link className={path === "/dashboard" ? "underline" : ""} href="/dashboard">Dashboard</Link>
            <Link className={path === "/plans" ? "underline" : ""} href="/plans">Plans</Link>
          </div>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}