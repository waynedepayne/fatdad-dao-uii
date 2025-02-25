import React from 'react';
import '../../styles/announcements.css';

const Announcements = () => {
  return (
    <div className="space-y-6">
      {/* Announcements Header */}
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Announcements & Updates</h2>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-neutral-900 text-white rounded-lg">
            <i className="fa-solid fa-plus mr-2"></i>New Announcement
          </button>
          <div className="w-10 h-10 flex items-center justify-center bg-neutral-200 rounded-full">
            <i className="fa-solid fa-user text-neutral-600"></i>
          </div>
        </div>
      </header>
      
      {/* Main Announcements Grid */}
      <div id="announcements-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-xl border border-neutral-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Critical Updates</h3>
            <button className="text-sm text-neutral-600 hover:text-neutral-900">View All</button>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="flex items-center gap-3 mb-3">
                <i className="fa-solid fa-circle-exclamation text-neutral-700"></i>
                <span className="font-medium">Emergency Protocol Update</span>
                <span className="px-2 py-1 text-xs bg-neutral-200 rounded-full">Critical</span>
              </div>
              <p className="text-sm text-neutral-600 mb-3">Important security patch deployment scheduled for 2025-01-20. All validators must update their nodes.</p>
              <div className="flex items-center text-sm text-neutral-500">
                <i className="fa-regular fa-clock mr-2"></i>
                <span>Posted 2 hours ago by</span>
                <div className="w-6 h-6 flex items-center justify-center bg-neutral-200 rounded-full mx-2">
                  <i className="fa-solid fa-user text-xs text-neutral-600"></i>
                </div>
                <span>Core Team</span>
              </div>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="flex items-center gap-3 mb-3">
                <i className="fa-solid fa-book text-neutral-700"></i>
                <span className="font-medium">DAO Whitepaper Release</span>
                <span className="px-2 py-1 text-xs bg-neutral-200 rounded-full">Update</span>
              </div>
              <p className="text-sm text-neutral-600 mb-3">New whitepaper draft available for community review. Feedback period ends 2025-01-25.</p>
              <div className="flex items-center text-sm text-neutral-500">
                <i className="fa-regular fa-clock mr-2"></i>
                <span>Posted 1 day ago by</span>
                <div className="w-6 h-6 flex items-center justify-center bg-neutral-200 rounded-full mx-2">
                  <i className="fa-solid fa-user text-xs text-neutral-600"></i>
                </div>
                <span>Documentation Team</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-neutral-200">
          <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
          <div className="space-y-4">
            <a href="#" className="flex items-center p-3 hover:bg-neutral-50 rounded-lg border border-neutral-200">
              <i className="fa-solid fa-file-lines w-5 mr-3 text-neutral-600"></i>
              <span>Documentation Hub</span>
            </a>
            <a href="#" className="flex items-center p-3 hover:bg-neutral-50 rounded-lg border border-neutral-200">
              <i className="fa-brands fa-discord w-5 mr-3 text-neutral-600"></i>
              <span>Discord Community</span>
            </a>
            <a href="#" className="flex items-center p-3 hover:bg-neutral-50 rounded-lg border border-neutral-200">
              <i className="fa-solid fa-book-open w-5 mr-3 text-neutral-600"></i>
              <span>Whitepaper Draft</span>
            </a>
            <a href="#" className="flex items-center p-3 hover:bg-neutral-50 rounded-lg border border-neutral-200">
              <i className="fa-brands fa-github w-5 mr-3 text-neutral-600"></i>
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Community Channel Updates */}
      <div id="community-updates" className="bg-white p-6 rounded-xl border border-neutral-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Community Channel Updates</h3>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-neutral-100 rounded-lg">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className="p-2 hover:bg-neutral-100 rounded-lg">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <i className="fa-brands fa-discord text-neutral-700"></i>
              <span className="font-medium">Discord</span>
            </div>
            <p className="text-sm text-neutral-600">5 new channels added</p>
            <p className="text-xs text-neutral-500 mt-2">Last updated 3h ago</p>
          </div>
          <div className="p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <i className="fa-brands fa-telegram text-neutral-700"></i>
              <span className="font-medium">Telegram</span>
            </div>
            <p className="text-sm text-neutral-600">New community bot deployed</p>
            <p className="text-xs text-neutral-500 mt-2">Last updated 5h ago</p>
          </div>
          <div className="p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <i className="fa-brands fa-twitter text-neutral-700"></i>
              <span className="font-medium">Twitter</span>
            </div>
            <p className="text-sm text-neutral-600">Weekly AMA scheduled</p>
            <p className="text-xs text-neutral-500 mt-2">Last updated 1d ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements; 