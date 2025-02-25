import React from 'react';
import Image from 'next/image';
import '../../styles/treasury.css';

const Treasury = () => {
  return (
    <div className="space-y-6">
      {/* Treasury Header - Fix alignment */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold">Treasury & Fund Management</h2>
          <p className="text-neutral-600">Monitor funds, review disbursement proposals, and manage scheduled releases</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-neutral-100 rounded-full">
            <i className="fa-solid fa-bell"></i>
          </button>
          <Image
            src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=456"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-neutral-200 treasury-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-600">Treasury Balance</h3>
            <i className="fa-solid fa-wallet text-neutral-400"></i>
          </div>
          <p className="text-2xl font-semibold">$3,250,000</p>
          <p className="mt-2 text-sm text-neutral-500">+5.2% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-neutral-200 treasury-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-600">Total Revenue</h3>
            <i className="fa-solid fa-arrow-trend-up text-neutral-400"></i>
          </div>
          <p className="text-2xl font-semibold">$850,000</p>
          <p className="mt-2 text-sm text-neutral-500">This quarter</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-neutral-200 treasury-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-600">Disbursements</h3>
            <i className="fa-solid fa-money-bill-transfer text-neutral-400"></i>
          </div>
          <p className="text-2xl font-semibold">$420,000</p>
          <p className="mt-2 text-sm text-neutral-500">Last 30 days</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-neutral-200 treasury-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-600">Pending Proposals</h3>
            <i className="fa-solid fa-file-invoice text-neutral-400"></i>
          </div>
          <p className="text-2xl font-semibold">8</p>
          <p className="mt-2 text-sm text-neutral-500">$650,000 total requested</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-neutral-200 treasury-card">
          <h3 className="text-lg font-semibold mb-6">Balance Summary</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-neutral-50 rounded-lg asset-balance">
              <p className="text-sm text-neutral-600">SOL Balance</p>
              <p className="text-xl font-semibold">2,500 SOL</p>
              <p className="text-sm text-neutral-500">≈ $150,000</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg asset-balance">
              <p className="text-sm text-neutral-600">USDC Balance</p>
              <p className="text-xl font-semibold">3,100,000 USDC</p>
              <p className="text-sm text-neutral-500">Stablecoin Reserve</p>
            </div>
          </div>
          <div className="chart-container bg-neutral-100 rounded-lg flex items-center justify-center">
            <p className="text-neutral-600">Revenue Sources Distribution Chart</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-neutral-200 treasury-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <button className="text-sm text-neutral-600 hover:text-neutral-900">View All</button>
          </div>
          <table className="w-full">
            <thead className="text-sm text-neutral-600 border-b">
              <tr>
                <th className="pb-3 text-left">Date/Time</th>
                <th className="pb-3 text-left">Type</th>
                <th className="pb-3 text-left">Amount</th>
                <th className="pb-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b transaction-row">
                <td className="py-3">2025-01-15 14:30</td>
                <td className="py-3">Disbursement</td>
                <td className="py-3">-25,000 USDC</td>
                <td className="py-3"><span className="px-2 py-1 bg-neutral-100 rounded-full text-xs">Completed</span></td>
              </tr>
              <tr className="border-b transaction-row">
                <td className="py-3">2025-01-14 09:15</td>
                <td className="py-3">Deposit</td>
                <td className="py-3">+50,000 USDC</td>
                <td className="py-3"><span className="px-2 py-1 bg-neutral-100 rounded-full text-xs">Completed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-neutral-200 mb-8 treasury-card">
        <h3 className="text-lg font-semibold mb-6">Pending Disbursement Proposals</h3>
        <table className="w-full">
          <thead className="text-sm text-neutral-600 border-b">
            <tr>
              <th className="pb-3 text-left">ID</th>
              <th className="pb-3 text-left">Title</th>
              <th className="pb-3 text-left">Amount</th>
              <th className="pb-3 text-left">Creator</th>
              <th className="pb-3 text-left">Status</th>
              <th className="pb-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b transaction-row">
              <td className="py-4">#125</td>
              <td className="py-4">Q1 Marketing Budget</td>
              <td className="py-4">250,000 USDC</td>
              <td className="py-4">
                <div className="flex items-center">
                  <Image 
                    src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=789" 
                    width={24} 
                    height={24} 
                    alt="User avatar" 
                    className="rounded-full mr-2"
                  />
                  <span>alex.eth</span>
                </div>
              </td>
              <td className="py-4"><span className="px-2 py-1 bg-neutral-100 rounded-full text-xs">Pending Vote</span></td>
              <td className="py-4">
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-neutral-100 rounded-lg text-xs hover:bg-neutral-200">View</button>
                  <button className="px-3 py-1 bg-neutral-100 rounded-lg text-xs hover:bg-neutral-200">Approve</button>
                  <button className="px-3 py-1 bg-neutral-100 rounded-lg text-xs hover:bg-neutral-200">Reject</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-neutral-200 treasury-card">
          <h3 className="text-lg font-semibold mb-6">Schedule Fund Release</h3>
          <form className="space-y-4 fund-release-form">
            <div>
              <label className="block text-sm text-neutral-600 mb-1">Proposal Reference</label>
              <input type="text" className="w-full p-2 border border-neutral-200 rounded-lg" placeholder="#125"/>
            </div>
            <div>
              <label className="block text-sm text-neutral-600 mb-1">Release Date/Time</label>
              <input type="datetime-local" className="w-full p-2 border border-neutral-200 rounded-lg"/>
            </div>
            <div>
              <label className="block text-sm text-neutral-600 mb-1">Amount</label>
              <input type="text" className="w-full p-2 border border-neutral-200 rounded-lg" placeholder="0.00"/>
            </div>
            <div>
              <label className="block text-sm text-neutral-600 mb-1">Asset Type</label>
              <select className="w-full p-2 border border-neutral-200 rounded-lg">
                <option>USDC</option>
                <option>SOL</option>
              </select>
            </div>
            <button className="w-full py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800">Schedule Release</button>
          </form>
        </div>
        <div className="bg-white p-6 rounded-xl border border-neutral-200 treasury-card">
          <h3 className="text-lg font-semibold mb-6">Upcoming Releases</h3>
          <div className="space-y-4">
            <div className="p-4 border border-neutral-200 rounded-lg transaction-row">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">Marketing Budget Q1</p>
                  <p className="text-sm text-neutral-500">250,000 USDC</p>
                </div>
                <button className="px-3 py-1 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800">Execute</button>
              </div>
              <div className="text-sm text-neutral-600">
                <p>Scheduled: 2025-01-20 09:00</p>
                <p>Time remaining: 4d 15h 30m</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treasury; 