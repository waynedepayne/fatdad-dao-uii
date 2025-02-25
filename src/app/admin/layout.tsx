import "@/styles/dashboard.css";
import { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Image from 'next/image';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Admin Dashboard - FatDAD DAO",
  description: "Administrative dashboard for FatDAD DAO",
};

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <Script src="https://cdn.jsdelivr.net/npm/apexcharts" />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div id="app" className="min-h-screen bg-white text-black">
        {/* Sidebar */}
        <div id="sidebar" className="fixed w-64 h-full bg-white border-r border-neutral-200 p-4">
          <div className="mb-8">
            <Link href="/" className="block">
              <h1 className="text-2xl font-bold text-black">FatDAD DAO</h1>
              <p className="text-sm text-neutral-600">Admin Portal</p>
            </Link>
          </div>
          <nav className="space-y-2">
            <Link href="/admin/dashboard" className={`flex items-center p-3 hover:bg-neutral-50 rounded-lg text-black`}>
              <i className="fa-solid fa-chart-line w-5"></i>
              <span className="ml-3">Dashboard</span>
            </Link>
            <Link href="/admin/proposals" className={`flex items-center p-3 hover:bg-neutral-50 rounded-lg text-black`}>
              <i className="fa-solid fa-file-lines w-5"></i>
              <span className="ml-3">Proposals</span>
            </Link>
            {/* ... other links ... */}
            <Link href="/admin/treasury" className="flex items-center p-3 hover:bg-neutral-50 rounded-lg text-black">
              <i className="fa-solid fa-vault w-5"></i>
              <span className="ml-3">Treasury</span>
            </Link>
            <Link href="/admin/governance" className="flex items-center p-3 hover:bg-neutral-50 rounded-lg text-black">
              <i className="fa-solid fa-sliders w-5"></i>
              <span className="ml-3">Governance</span>
            </Link>
            <Link href="/admin/users" className="flex items-center p-3 hover:bg-neutral-50 rounded-lg text-black">
              <i className="fa-solid fa-users-gear w-5"></i>
              <span className="ml-3">User Access</span>
            </Link>
            <Link href="/admin/audit" className="flex items-center p-3 hover:bg-neutral-50 rounded-lg text-black">
              <i className="fa-solid fa-list-check w-5"></i>
              <span className="ml-3">Audit Logs</span>
            </Link>
            <Link href="/admin/announcements" className="flex items-center p-3 hover:bg-neutral-50 rounded-lg text-black">
              <i className="fa-solid fa-bullhorn w-5"></i>
              <span className="ml-3">Announcements</span>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div id="main-content" className="ml-64 p-8 text-black">
          {children}
        </div>
      </div>
    </>
  );
} 