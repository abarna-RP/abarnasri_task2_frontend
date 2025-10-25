import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axios';
import axios from 'axios'
const Groups = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAddMemberForm, setShowAddMemberForm] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [addMemberData, setAddMemberData] = useState({
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('/api/groups');
      setGroups(response.data);
    } catch (error) {
      setError('Failed to fetch groups');
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/groups', formData);
      setFormData({ name: '', description: '' });
      setShowCreateForm(false);
      fetchGroups();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create group');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (groupId, e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(`/api/groups/${groupId}/members`, addMemberData);
      setAddMemberData({ email: '' });
      setShowAddMemberForm(null);
      fetchGroups();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add member');
    } finally {
      setLoading(false);
    }
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
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Groups</h1>
              <p className="text-white/90 backdrop-blur-sm mt-2">
                Collaborate and manage your study groups
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-white/25 backdrop-blur-lg hover:bg-white/35 border-2 border-white/40 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
          >
            Create New Group
          </button>
        </div>

        {error && (
          <div className="bg-red-400/25 backdrop-blur-lg border border-red-300/40 text-white px-4 py-3 rounded-xl mb-6 flex items-center shadow-lg">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="backdrop-blur-sm">{error}</span>
          </div>
        )}

        {/* Create Group Form */}
        {showCreateForm && (
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Create New Group</h2>
              <form onSubmit={handleCreateGroup}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3 backdrop-blur-sm">
                      Group Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/60 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter group name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3 backdrop-blur-sm">
                      Description
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/60 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Group description (optional)"
                    />
                  </div>
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
                      <span className="backdrop-blur-sm">Create Group</span>
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

        {/* Groups List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.map((group) => (
            <div key={group._id} className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-6 relative overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3 drop-shadow-lg">{group.name}</h3>
                {group.description && (
                  <p className="text-white/80 mb-4 backdrop-blur-sm">{group.description}</p>
                )}
                
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3 backdrop-blur-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Members ({group.members.length})
                  </h4>
                  <div className="space-y-2">
                    {group.members.map((member) => (
                      <div key={member._id} className="flex items-center text-sm text-white/80 backdrop-blur-sm bg-white/10 px-3 py-2 rounded-xl border border-white/20">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          {member.studentId && (
                            <div className="text-xs text-white/60">ID: {member.studentId}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {group.createdBy._id === user.id && (
                  <div className="space-y-3">
                    {showAddMemberForm === group._id ? (
                      <form onSubmit={(e) => handleAddMember(group._id, e)} className="space-y-3">
                        <input
                          type="email"
                          required
                          placeholder="Enter member email"
                          className="w-full px-4 py-3 bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/60 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                          value={addMemberData.email}
                          onChange={(e) => setAddMemberData({ email: e.target.value })}
                        />
                        <div className="flex space-x-3">
                          <button
                            type="submit"
                            disabled={loading}
                            className="bg-white/25 backdrop-blur-lg hover:bg-white/35 border-2 border-white/40 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-50 flex-1"
                          >
                            Add Member
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowAddMemberForm(null)}
                            className="bg-white/10 backdrop-blur-lg hover:bg-white/20 border-2 border-white/30 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 flex-1"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button
                        onClick={() => setShowAddMemberForm(group._id)}
                        className="w-full bg-white/25 backdrop-blur-lg hover:bg-white/35 border-2 border-white/40 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
                      >
                        <span className="backdrop-blur-sm">Add Member</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {groups.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
              <div className="relative z-10">
                <svg className="mx-auto h-16 w-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-4 text-xl font-semibold text-white backdrop-blur-sm">No groups yet</h3>
                <p className="mt-2 text-white/80 backdrop-blur-sm max-w-md mx-auto">
                  Start collaborating by creating your first group
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="mt-6 bg-white/25 backdrop-blur-lg hover:bg-white/35 border-2 border-white/40 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
                >
                  Create Your First Group
                </button>
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

export default Groups;