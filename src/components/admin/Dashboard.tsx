'use client';

import Image from "next/image";
import Link from "next/link";
import '../../styles/dashboard.css';
import Proposals from "./Proposals";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Treasury from './Treasury';
import Governance from './Governance';
import Audit from './Audit';
import Announcements from './Announcements';

export default function Dashboard() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<'dashboard' | 'proposals' | 'treasury' | 'governance' | 'audit' | 'announcements'>('dashboard');

  useEffect(() => {
    if (pathname === '/admin/proposals') {
      setActiveSection('proposals');
    } else if (pathname === '/admin/treasury') {
      setActiveSection('treasury');
    } else if (pathname === '/admin/governance') {
      setActiveSection('governance');
    } else if (pathname === '/admin/audit') {
      setActiveSection('audit');
    } else if (pathname === '/admin/announcements') {
      setActiveSection('announcements');
    } else {
      setActiveSection('dashboard'); // Or default to dashboard
    }
  }, [pathname]);

  return (
    <div id="app" className="min-h-screen bg-white text-black">
     
      {/* Main Content */}
      <div id="main-content" className="p-8">
        <header id="header" className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-black">
              {activeSection === 'dashboard' && 'Dashboard Overview'}
              {activeSection === 'treasury' && 'Treasury & Fund Management'}
              {activeSection === 'proposals' && 'Proposal Management'}
              {activeSection === 'governance' && 'Governance Settings & System Configuration'}
              {activeSection === 'audit' && 'System Logs & Audit Trail'}
              {activeSection === 'announcements' && 'Announcements & Updates'}
            </h2>
            <p className="text-neutral-600">
              {activeSection === 'dashboard' && 'Welcome to the FatDAD DAO admin dashboard'}
              {activeSection === 'treasury' && 'Monitor funds, review disbursement proposals, and manage scheduled releases'}
              {activeSection === 'proposals' && 'Create and manage proposals for the DAO'}
              {activeSection === 'governance' && 'Monitor core parameters and manage user roles as we transition toward full decentralization'}
              {activeSection === 'audit' && 'A comprehensive record of all admin actions, on-chain events, and DAO proposal lifecycle events.'}
              {activeSection === 'announcements' && 'Manage and distribute important announcements to your community'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-neutral-100 rounded-full">
              <i className="fa-solid fa-bell"></i>
            </button>
            <Image
              src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=123"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </header>

        {activeSection === 'dashboard' && (
          <>
            {/* Key Metrics */}
            <div id="key-metrics" className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl border border-neutral-200 dashboard-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-neutral-600">Total Token Supply</h3>
                  <i className="fa-solid fa-coins text-neutral-400"></i>
                </div>
                <p className="text-2xl font-semibold">10,000,000</p>
                <div className="mt-2 text-sm text-neutral-500">
                  <span>8.5M Circulating</span>
                  <span className="mx-2">•</span>
                  <span>1.5M Reserved</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-neutral-200 dashboard-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-neutral-600">Treasury Balance</h3>
                  <i className="fa-solid fa-wallet text-neutral-400"></i>
                </div>
                <p className="text-2xl font-semibold">$2,450,000</p>
                <p className="mt-2 text-sm text-neutral-500">+2.5% from last week</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-neutral-200 dashboard-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-neutral-600">Active Proposals</h3>
                  <i className="fa-solid fa-file-signature text-neutral-400"></i>
                </div>
                <p className="text-2xl font-semibold">12</p>
                <div className="mt-2 text-sm text-neutral-500">
                  <span>8 Pending</span>
                  <span className="mx-2">•</span>
                  <span>4 Passed</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-neutral-200 dashboard-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-neutral-600">Active Voters</h3>
                  <i className="fa-solid fa-users text-neutral-400"></i>
                </div>
                <p className="text-2xl font-semibold">1,245</p>
                <p className="mt-2 text-sm text-neutral-500">75% Participation Rate</p>
              </div>
            </div>

            {/* Recent Activity Sections */}
            <div id="recent-activity-2" className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl border border-neutral-200 dashboard-card">
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center">
                      <i className="fa-solid fa-arrow-right-arrow-left w-8 text-neutral-400"></i>
                      <div className="ml-3">
                        <p className="font-medium">Treasury Disbursement</p>
                        <p className="text-sm text-neutral-500">2025-01-15 14:30</p>
                      </div>
                    </div>
                    <span className="font-medium">-25,000 DAD</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center">
                      <i className="fa-solid fa-arrow-right-arrow-left w-8 text-neutral-400"></i>
                      <div className="ml-3">
                        <p className="font-medium">Staking Rewards</p>
                        <p className="text-sm text-neutral-500">2025-01-14 09:15</p>
                      </div>
                    </div>
                    <span className="font-medium">+50,000 DAD</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-neutral-200 dashboard-card">
                <h3 className="text-lg font-semibold mb-4">System Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Quorum Threshold</span>
                    <span className="font-medium">66%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Supermajority</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Time-lock Duration</span>
                    <span className="font-medium">48 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Network Status</span>
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 bg-neutral-800 rounded-full mr-2"></span>
                      Operational
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div id="recent-activity" className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-neutral-200 dashboard-card">
                <h3 className="text-lg font-semibold mb-4">Recent Proposals</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 hover:bg-neutral-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-neutral-400"></div>
                    <div>
                      <p className="font-medium">Treasury Allocation Q1 2025</p>
                      <p className="text-sm text-neutral-500">Created 2h ago • Voting ends in 5 days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 hover:bg-neutral-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-neutral-400"></div>
                    <div>
                      <p className="font-medium">Governance Parameter Update</p>
                      <p className="text-sm text-neutral-500">Created 1d ago • Voting ends in 3 days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 hover:bg-neutral-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-neutral-400"></div>
                    <div>
                      <p className="font-medium">Community Grant Program</p>
                      <p className="text-sm text-neutral-500">Created 2d ago • Voting ends in 2 days</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-neutral-200 dashboard-card">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <i className="fa-solid fa-circle-check text-neutral-400 mr-3"></i>
                    <div>
                      <p className="text-sm">Proposal #45 passed</p>
                      <p className="text-xs text-neutral-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <i className="fa-solid fa-arrow-right-from-bracket text-neutral-400 mr-3"></i>
                    <div>
                      <p className="text-sm">Treasury disbursement of Ξ 5.5</p>
                      <p className="text-xs text-neutral-500">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <i className="fa-solid fa-file-circle-plus text-neutral-400 mr-3"></i>
                    <div>
                      <p className="text-sm">New proposal submitted</p>
                      <p className="text-xs text-neutral-500">8 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection === 'treasury' && (
          <Treasury />
        )}

        {activeSection === 'proposals' && (
          <Proposals />
        )}

        {activeSection === 'governance' && (
          <Governance />
        )}

        {activeSection === 'audit' && (
          <Audit />
        )}

        {activeSection === 'announcements' && (
          <Announcements />
        )}
      </div>
    </div>
  );
} 