import React from 'react';
import Image from 'next/image';
import '../../styles/audit.css';

const Audit = () => {
  return (
    <div className="space-y-6">
      {/* Audit Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold">System Logs & Audit Trail</h2>
          <p className="text-neutral-600">A comprehensive record of all admin actions, on-chain events, and DAO proposal lifecycle events.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-neutral-100 rounded-full">
            <i className="fa-solid fa-bell"></i>
          </button>
          <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-user text-neutral-500"></i>
          </div>
        </div>
      </header>

      <div className="mt-4 bg-white p-4 rounded-lg border border-neutral-200 audit-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <span className="text-sm text-neutral-600">Last 24 Hours</span>
              <p className="text-xl font-semibold">50 Events</p>
            </div>
            <div>
              <span className="text-sm text-neutral-600">Active Users</span>
              <p className="text-xl font-semibold">12</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-neutral-100 rounded-lg hover:bg-neutral-200">
            <i className="fa-solid fa-download mr-2"></i>Export Logs
          </button>
        </div>
      </div>

      <div id="filters" className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input type="text" placeholder="Search logs..." className="w-full px-4 py-2 border border-neutral-200 rounded-lg"/>
        </div>
        <select className="px-4 py-2 border border-neutral-200 rounded-lg bg-white">
          <option>All Actions</option>
          <option>Proposals</option>
          <option>Treasury</option>
          <option>Admin</option>
        </select>
        <select className="px-4 py-2 border border-neutral-200 rounded-lg bg-white">
          <option>Last 24 Hours</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div id="logs-table" className="bg-white rounded-xl border border-neutral-200 mb-8 audit-card overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-neutral-200">
            <tr className="text-left">
              <th className="px-6 py-4 text-sm font-medium text-neutral-600">Timestamp</th>
              <th className="px-6 py-4 text-sm font-medium text-neutral-600">Action Type</th>
              <th className="px-6 py-4 text-sm font-medium text-neutral-600">User/Wallet</th>
              <th className="px-6 py-4 text-sm font-medium text-neutral-600">Description</th>
              <th className="px-6 py-4 text-sm font-medium text-neutral-600">Status</th>
              <th className="px-6 py-4 text-sm font-medium text-neutral-600"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            <tr className="hover:bg-neutral-50 log-row">
              <td className="px-6 py-4 text-sm">2025-01-15 14:30</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-neutral-100 rounded-full text-sm">Proposal Created</span>
              </td>
              <td className="px-6 py-4 text-sm">0x1234...5678</td>
              <td className="px-6 py-4 text-sm">New proposal #123 submitted for treasury allocation</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-neutral-800 text-white rounded text-xs">Success</span>
              </td>
              <td className="px-6 py-4">
                <button className="text-neutral-600 hover:text-neutral-900">
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
              </td>
            </tr>
            <tr className="hover:bg-neutral-50 log-row">
              <td className="px-6 py-4 text-sm">2025-01-15 13:22</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-neutral-100 rounded-full text-sm">Treasury</span>
              </td>
              <td className="px-6 py-4 text-sm">0xabcd...efgh</td>
              <td className="px-6 py-4 text-sm">Disbursement of 50,000 USDC for marketing</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-neutral-800 text-white rounded text-xs">Success</span>
              </td>
              <td className="px-6 py-4">
                <button className="text-neutral-600 hover:text-neutral-900">
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
              </td>
            </tr>
            <tr className="hover:bg-neutral-50 log-row">
              <td className="px-6 py-4 text-sm">2025-01-15 12:05</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-neutral-100 rounded-full text-sm">Admin</span>
              </td>
              <td className="px-6 py-4 text-sm">0x7890...1234</td>
              <td className="px-6 py-4 text-sm">Changed governance parameters</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-neutral-800 text-white rounded text-xs">Success</span>
              </td>
              <td className="px-6 py-4">
                <button className="text-neutral-600 hover:text-neutral-900">
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="audit-trail" className="bg-white rounded-xl border border-neutral-200 p-6 audit-card overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Treasury Transaction Audits</h3>
        <table className="w-full">
          <thead className="border-b border-neutral-200">
            <tr className="text-left">
              <th className="py-4 text-sm font-medium text-neutral-600">Transaction ID</th>
              <th className="py-4 text-sm font-medium text-neutral-600">Date/Time</th>
              <th className="py-4 text-sm font-medium text-neutral-600">Amount</th>
              <th className="py-4 text-sm font-medium text-neutral-600">Proposal</th>
              <th className="py-4 text-sm font-medium text-neutral-600">Status</th>
              <th className="py-4 text-sm font-medium text-neutral-600"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            <tr className="hover:bg-neutral-50 transaction-row">
              <td className="py-4 text-sm">0xabc...def</td>
              <td className="py-4 text-sm">2025-01-15 14:30</td>
              <td className="py-4 text-sm">500 USDC</td>
              <td className="py-4 text-sm">#123</td>
              <td className="py-4">
                <span className="px-2 py-1 bg-neutral-800 text-white rounded text-xs">Completed</span>
              </td>
              <td className="py-4">
                <button className="px-3 py-1 text-sm border border-neutral-200 rounded hover:bg-neutral-50">View Details</button>
              </td>
            </tr>
            <tr className="hover:bg-neutral-50 transaction-row">
              <td className="py-4 text-sm">0xdef...ghi</td>
              <td className="py-4 text-sm">2025-01-14 11:42</td>
              <td className="py-4 text-sm">1,200 USDC</td>
              <td className="py-4 text-sm">#118</td>
              <td className="py-4">
                <span className="px-2 py-1 bg-neutral-800 text-white rounded text-xs">Completed</span>
              </td>
              <td className="py-4">
                <button className="px-3 py-1 text-sm border border-neutral-200 rounded hover:bg-neutral-50">View Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Audit; 