'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { useFlowOps } from '@/context/FlowOpsContext';
import { RequestItem, RequestStatus, PriorityLevel } from '@/types/flowops';

interface RequestsViewProps {
  onRequestSelect: (request: RequestItem) => void;
}

export const RequestsView: React.FC<RequestsViewProps> = ({ onRequestSelect }) => {
  const { requests, createNewRequest } = useFlowOps();

  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'priority'>('newest');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDept, setNewDept] = useState('DevOps Engineering');
  const [newPriority, setNewPriority] = useState<PriorityLevel>('High');
  const [newAmount, setNewAmount] = useState('$25,000');
  const [newDesc, setNewDesc] = useState('');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createNewRequest({
      title: newTitle,
      department: newDept,
      priority: newPriority,
      amount: newAmount,
      description: newDesc
    });
    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const filteredRequests = requests.filter((req) => {
    const matchesTab = activeTab === 'All' || req.status === activeTab;
    const matchesPriority = priorityFilter === 'All' || req.priority === priorityFilter;
    const matchesDept = departmentFilter === 'All' || req.department === departmentFilter || req.requester.department.includes(departmentFilter);
    const matchesSearch =
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.requester.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesPriority && matchesDept && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'priority') {
      const pMap: Record<string, number> = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
      return (pMap[b.priority] || 0) - (pMap[a.priority] || 0);
    }
    return 0; // default order
  });

  return (
    <div className="space-y-6">
      
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Request Management Workspace</h2>
          <p className="text-xs text-gray-500">Track, review, and triage business operational requests across departments</p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-gray-800 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Request</span>
        </button>
      </div>

      {/* Filter & Search Controls Bar */}
      <div className="space-y-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 overflow-x-auto text-xs font-semibold">
          {['All', 'Pending', 'In Review', 'Approved', 'Rejected', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-subtle font-bold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Secondary Controls: Search + Priority + Dept + Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search requests by ID, title, or requester..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-subtle"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg font-semibold text-gray-700 focus:outline-none"
            >
              <option value="All">Priority: All</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
            </select>

            {/* Department Filter */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg font-semibold text-gray-700 focus:outline-none"
            >
              <option value="All">Department: All</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Security">Security</option>
              <option value="Engineering">Engineering</option>
              <option value="People Ops">People Ops</option>
            </select>

            {/* Sort Dropdown */}
            <button
              onClick={() => setSortBy(sortBy === 'newest' ? 'priority' : 'newest')}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold flex items-center gap-1.5"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort: {sortBy === 'newest' ? 'Newest' : 'Priority'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200">
                <th className="py-3.5 px-5">ID</th>
                <th className="py-3.5 px-5">Request Title</th>
                <th className="py-3.5 px-5">Requester</th>
                <th className="py-3.5 px-5">Owner</th>
                <th className="py-3.5 px-5">Priority</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {filteredRequests.map((req) => (
                <tr
                  key={req.id}
                  onClick={() => onRequestSelect(req)}
                  className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                >
                  <td className="py-4 px-5 font-mono text-gray-500 font-semibold">{req.id}</td>
                  <td className="py-4 px-5 font-bold text-gray-900 max-w-xs truncate">{req.title}</td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <img src={req.requester.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                      <div>
                        <div className="text-gray-900 font-semibold">{req.requester.name}</div>
                        <div className="text-[10px] text-gray-400">{req.requester.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <img src={req.owner.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-gray-700">{req.owner.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold ${
                      req.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
                      req.priority === 'High' ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {req.priority}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                      req.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      req.status === 'In Review' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      req.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-gray-100 text-gray-700 border-gray-200'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-gray-400 font-mono text-[11px]">{req.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Request Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-modal border border-gray-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
                <h3 className="text-base font-bold text-gray-900">Create Operational Request</h3>
                <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Request Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Q4 Kubernetes Cluster Upgrade"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Department</label>
                    <select
                      value={newDept}
                      onChange={(e) => setNewDept(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none"
                    >
                      <option value="Infrastructure">DevOps Infrastructure</option>
                      <option value="Security">Security & Compliance</option>
                      <option value="Data Engineering">Data Engineering</option>
                      <option value="People Ops">People Operations</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Priority</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as PriorityLevel)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none"
                    >
                      <option value="Urgent">Urgent</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Budget / Resource Allocation</label>
                  <input
                    type="text"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Description & Business Justification</label>
                  <textarea
                    rows={3}
                    placeholder="Provide context and prerequisites..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>

                <div className="pt-3 border-t flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 shadow-sm"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
