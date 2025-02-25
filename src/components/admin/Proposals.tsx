'use client';

import '../../styles/proposal.css';

export default function Proposals() {
  return (
    <div id="main-content" className="p-8">
      <header id="header" className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Proposal Management</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-neutral-100 rounded-full">
              <i className="fa-solid fa-bell"></i>
            </button>
            <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-user text-neutral-500"></i>
            </div>
          </div>
        </div>
        <p className="text-neutral-600 mb-8">View, review, and manage all active, pending, or finalized proposals.</p>
        <div id="proposal-stats" className="grid grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-neutral-600">Total Proposals</h3>
              <i className="fa-solid fa-file-lines text-neutral-400"></i>
            </div>
            <p className="text-2xl font-semibold">156</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-neutral-600">Active</h3>
              <i className="fa-solid fa-circle-play text-neutral-400"></i>
            </div>
            <p className="text-2xl font-semibold">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-neutral-600">Pending</h3>
              <i className="fa-solid fa-clock text-neutral-400"></i>
            </div>
            <p className="text-2xl font-semibold">8</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <button className="flex items-center gap-2 px-6 py-4 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800">
              <i className="fa-solid fa-plus"></i>
              <span>New Proposal</span>
            </button>
          </div>
        </div>
      </header>
      <div id="filters" className="bg-white p-4 rounded-xl border border-neutral-200 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <i className="fa-solid fa-search absolute left-3 top-3 text-neutral-400"></i>
              <input type="text" placeholder="Search proposals..." className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg" />
            </div>
          </div>
          <select className="px-4 py-2 border border-neutral-200 rounded-lg">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Finalized</option>
            <option>Flagged</option>
          </select>
          <input type="date" className="px-4 py-2 border border-neutral-200 rounded-lg" />
          <button className="px-4 py-2 bg-neutral-900 text-white rounded-lg">Filter</button>
        </div>
      </div>
      <div id="proposals-table" className="bg-white rounded-xl border border-neutral-200">
        <table className="w-full">
          <thead className="border-b border-neutral-200">
            <tr className="text-left">
              <th className="p-4">ID</th>
              <th className="p-4">Title</th>
              <th className="p-4">Creator</th>
              <th className="p-4">Status</th>
              <th className="p-4">Deadline</th>
              <th className="p-4">Votes</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-100">
              <td className="p-4">#123</td>
              <td className="p-4">
                <div>
                  <p className="font-medium">Treasury Allocation Q1 2025</p>
                  <p className="text-sm text-neutral-500">Proposal for Q1 budget allocation...</p>
                </div>
              </td>
              <td className="p-4">
                <span className="text-sm">0x1234...5678</span>
              </td>
              <td className="p-4">
                <span className="px-3 py-1 text-sm bg-neutral-100 rounded-full">Active</span>
              </td>
              <td className="p-4">
                <span className="text-sm">2025-03-15</span>
              </td>
              <td className="p-4">
                <div className="text-sm">
                  <span className="text-neutral-800">75% For</span>
                  <span className="mx-2">|</span>
                  <span className="text-neutral-400">25% Against</span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-neutral-100 rounded-lg">
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <button className="p-2 hover:bg-neutral-100 rounded-lg">
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button className="p-2 hover:bg-neutral-100 rounded-lg">
                    <i className="fa-solid fa-flag"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 