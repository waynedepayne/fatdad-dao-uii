import React from 'react';
import Image from 'next/image';
import '../../styles/governance.css';

const Governance = () => {
  return (
    <div className="space-y-6">
      {/* Governance Header - Fix alignment */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold">Governance Settings & System Configuration</h2>
          <p className="text-neutral-600">Monitor core parameters and manage user roles as we transition toward full decentralization.</p>
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
      
      <div id="quick-stats" className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-neutral-200 governance-card">
          <div className="text-sm text-neutral-600">Voting Multiplier</div>
          <div className="text-xl font-semibold">2.5x</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200 governance-card">
          <div className="text-sm text-neutral-600">Quorum Threshold</div>
          <div className="text-xl font-semibold">25%</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200 governance-card">
          <div className="text-sm text-neutral-600">Supermajority</div>
          <div className="text-xl font-semibold">66%</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200 governance-card">
          <div className="text-sm text-neutral-600">Next Review</div>
          <div className="text-xl font-semibold">Mar 15, 2025</div>
        </div>
      </div>

      <section id="core-parameters" className="mb-8">
        <div className="bg-white p-6 rounded-xl border border-neutral-200 governance-card">
          <h2 className="text-lg font-semibold mb-6">Parameter Overview</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-4">Voting Multipliers</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center parameter-row">
                    <span className="text-neutral-600">OG NFT Holder</span>
                    <span>2.5x</span>
                  </div>
                  <div className="flex justify-between items-center parameter-row">
                    <span className="text-neutral-600">Founder</span>
                    <span>3.0x</span>
                  </div>
                  <div className="flex justify-between items-center parameter-row">
                    <span className="text-neutral-600">Standard</span>
                    <span>1.0x</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-4">Time-Lock Settings</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center parameter-row">
                    <span className="text-neutral-600">Standard Proposals</span>
                    <span>7 days</span>
                  </div>
                  <div className="flex justify-between items-center parameter-row">
                    <span className="text-neutral-600">Critical Changes</span>
                    <span>14 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="change-proposals" className="mb-8">
        <div className="bg-white p-6 rounded-xl border border-neutral-200 governance-card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Change Proposal Log</h2>
            <button className="px-4 py-2 bg-neutral-100 rounded-lg hover:bg-neutral-200">New Proposal</button>
          </div>
          <table className="w-full">
            <thead className="text-sm text-neutral-600">
              <tr className="border-b">
                <th className="text-left pb-3">ID</th>
                <th className="text-left pb-3">Description</th>
                <th className="text-left pb-3">Status</th>
                <th className="text-left pb-3">Time-lock</th>
                <th className="text-right pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b proposal-row">
                <td className="py-3">GOV-25</td>
                <td>Update Quorum Threshold to 30%</td>
                <td><span className="px-2 py-1 bg-neutral-100 rounded-full text-xs">Pending</span></td>
                <td>5 days left</td>
                <td className="text-right"><button className="text-neutral-600 hover:text-neutral-900">View Details</button></td>
              </tr>
              <tr className="border-b proposal-row">
                <td className="py-3">GOV-24</td>
                <td>Adjust Voting Multipliers</td>
                <td><span className="px-2 py-1 bg-neutral-100 rounded-full text-xs">Approved</span></td>
                <td>Completed</td>
                <td className="text-right"><button className="text-neutral-600 hover:text-neutral-900">View Details</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="user-roles" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-neutral-200 governance-card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">User Role Overview</h2>
            <button className="px-4 py-2 bg-neutral-100 rounded-lg hover:bg-neutral-200">Add Admin</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg user-row">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-user text-neutral-500"></i>
                </div>
                <div>
                  <p className="font-medium">0x1234...5678</p>
                  <p className="text-sm text-neutral-500">Founder</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-neutral-100 rounded-lg">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="p-2 hover:bg-neutral-100 rounded-lg">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-neutral-200 governance-card">
          <h2 className="text-lg font-semibold mb-6">Access Control Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between switch-row">
              <span className="text-neutral-600">Multi-sig Required</span>
              <div className="w-12 h-6 bg-neutral-200 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
              </div>
            </div>
            <div className="flex items-center justify-between switch-row">
              <span className="text-neutral-600">Time-lock Enabled</span>
              <div className="w-12 h-6 bg-neutral-800 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Governance; 