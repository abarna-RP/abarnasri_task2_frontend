import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axios';
import axios from 'axios'
const Assignments = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    oneDriveLink: '',
    assignedTo: 'all',
    assignedGroups: []
  });
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAssignments();
    if (user.role === 'professor') {
      fetchGroups();
    }
  }, [user.role]);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('/api/assignments');
      setAssignments(response.data);
    } catch (error) {
      setError('Failed to fetch assignments');
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get('/api/groups');
      setGroups(response.data);
    } catch (error) {
      console.error('Failed to fetch groups');
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/assignments', formData);
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        oneDriveLink: '',
        assignedTo: 'all',
        assignedGroups: []
      });
      setShowCreateForm(false);
      fetchAssignments();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create assignment');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/30 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-300/30 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-300/30 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-blue-300/20 rounded-full mix-blend-soft-light filter blur-2xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Assignments</h1>
              <p className="text-white/90 backdrop-blur-sm mt-2">
                {user.role === 'professor' ? 'Manage and create assignments' : 'View your assigned work'}
              </p>
            </div>
          </div>
          
          {user.role === 'professor' && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-white/25 backdrop-blur-lg hover:bg-white/35 border-2 border-white/40 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Create Assignment
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-400/25 backdrop-blur-lg border border-red-300/40 text-white px-4 py-3 rounded-xl mb-6 flex items-center shadow-lg">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="backdrop-blur-sm">{error}</span>
          </div>
        )}

        {/* Create Assignment Form */}
        {showCreateForm && (
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Create New Assignment</h2>
              <form onSubmit={handleCreateAssignment}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3 backdrop-blur-sm">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/60 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter assignment title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3 backdrop-blur-sm">
                      Due Date *
                    </label>
                    <input
                      type="datetime-local"
                      required
                      className="w-full px-4 py-3 bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/60 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-white mb-3 backdrop-blur-sm">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/60 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the assignment requirements..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-white mb-3 backdrop-blur-sm">
                      OneDrive Link *
                    </label>
                    <input
                      type="url"
                      required
                      className="w-full px-4 py-3 bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/60 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                      value={formData.oneDriveLink}
                      onChange={(e) => setFormData({ ...formData, oneDriveLink: e.target.value })}
                      placeholder="https://1drv.ms/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3 backdrop-blur-sm">
                      Assign To
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-white/60 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                      value={formData.assignedTo}
                      onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    >
                      <option value="all" className="bg-gray-800">All Students</option>
                      <option value="specific" className="bg-gray-800">Specific Groups</option>
                    </select>
                  </div>
                  {formData.assignedTo === 'specific' && (
                    <div>
                      <label className="block text-sm font-semibold text-white mb-3 backdrop-blur-sm">
                        Select Groups
                      </label>
                      <select
                        multiple
                        className="w-full px-4 py-3 bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-white/60 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                        value={formData.assignedGroups}
                        onChange={(e) => setFormData({
                          ...formData,
                          assignedGroups: Array.from(e.target.selectedOptions, option => option.value)
                        })}
                      >
                        {groups.map(group => (
                          <option key={group._id} value={group._id} className="bg-gray-800">
                            {group.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-white/60 mt-2 backdrop-blur-sm">Hold Ctrl to select multiple groups</p>
                    </div>
                  )}
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-white/25 backdrop-blur-lg hover:bg-white/35 border-2 border-white/40 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center backdrop-blur-sm">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </div>
                    ) : (
                      <span className="backdrop-blur-sm">Create Assignment</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="bg-white/10 backdrop-blur-lg hover:bg-white/20 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
                  >
                    <span className="backdrop-blur-sm">Cancel</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Assignments List */}
        <div className="space-y-6">
          {assignments.map((assignment) => (
            <div key={assignment._id} className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-8 relative overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{assignment.title}</h3>
                    <p className="text-white/80 backdrop-blur-sm">By {assignment.createdBy.name}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-semibold backdrop-blur-sm ${
                      isOverdue(assignment.dueDate) ? 'text-red-300' : 'text-white/90'
                    }`}>
                      Due: {formatDate(assignment.dueDate)}
                    </div>
                    {isOverdue(assignment.dueDate) && (
                      <span className="inline-block bg-red-400/25 border border-red-300/40 text-red-100 text-sm px-3 py-1 rounded-full mt-2 backdrop-blur-sm">
                        Overdue
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-white/90 mb-6 text-lg backdrop-blur-sm">{assignment.description}</p>

                <div className="flex items-center justify-between">
                  <a
                    href={assignment.oneDriveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/25 backdrop-blur-lg hover:bg-white/35 border-2 border-white/40 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 inline-flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="backdrop-blur-sm">OneDrive Link</span>
                  </a>

                  {assignment.assignedTo === 'specific' && assignment.assignedGroups.length > 0 && (
                    <div className="text-white/80 backdrop-blur-sm text-sm bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                      Assigned to: {assignment.assignedGroups.map(g => g.name).join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {assignments.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
              <div className="relative z-10">
                <svg className="mx-auto h-16 w-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-4 text-xl font-semibold text-white backdrop-blur-sm">No assignments</h3>
                <p className="mt-2 text-white/80 backdrop-blur-sm max-w-md mx-auto">
                  {user.role === 'professor' 
                    ? 'Get started by creating your first assignment.' 
                    : 'No assignments have been posted yet.'
                  }
                </p>
                {user.role === 'professor' && (
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="mt-6 bg-white/25 backdrop-blur-lg hover:bg-white/35 border-2 border-white/40 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
                  >
                    Create Your First Assignment
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for enhanced animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </div>
  );
};

export default Assignments;