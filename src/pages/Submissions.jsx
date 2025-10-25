import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Submissions = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [showSubmitForm, setShowSubmitForm] = useState(null);
  const [submitData, setSubmitData] = useState({
    assignmentId: '',
    submissionLink: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAssignments();
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetchSubmissions(selectedGroup);
    }
  }, [selectedGroup]);

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
      if (response.data.length > 0) {
        setSelectedGroup(response.data[0]._id);
      }
    } catch (error) {
      setError('Failed to fetch groups');
    }
  };

  const fetchSubmissions = async (groupId) => {
    try {
      const response = await axios.get(`/api/submissions/group/${groupId}`);
      setSubmissions(response.data);
    } catch (error) {
      setError('Failed to fetch submissions');
    }
  };

  const handleSubmitAssignment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/submissions', {
        assignmentId: submitData.assignmentId,
        groupId: selectedGroup,
        submissionLink: submitData.submissionLink
      });
      setSubmitData({ assignmentId: '', submissionLink: '' });
      setShowSubmitForm(null);
      fetchSubmissions(selectedGroup);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit assignment');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSubmission = async (submissionId) => {
    try {
      await axios.post(`/api/submissions/${submissionId}/confirm`);
      fetchSubmissions(selectedGroup);
    } catch (error) {
      setError('Failed to confirm submission');
    }
  };

  const getStatusBadge = (submission) => {
    const statusConfig = {
      pending: { 
        color: 'bg-yellow-400/25 border-yellow-300/40 text-yellow-100 backdrop-blur-sm', 
        text: 'Not Submitted' 
      },
      submitted: { 
        color: 'bg-blue-400/25 border-blue-300/40 text-blue-100 backdrop-blur-sm', 
        text: 'Step 1: Submitted' 
      },
      confirmed: { 
        color: 'bg-green-400/25 border-green-300/40 text-green-100 backdrop-blur-sm', 
        text: 'Step 2: Confirmed' 
      }
    };
    
    const config = statusConfig[submission.status] || statusConfig.pending;
    return (
      <span className={`inline-block px-3 py-2 text-sm font-semibold rounded-xl border ${config.color}`}>
        {config.text}
      </span>
    );
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
        <div className="mb-8 text-center">
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Submissions</h1>
              <p className="text-xl text-white/90 backdrop-blur-sm">
                Track and manage your assignment submissions
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-400/25 backdrop-blur-lg border border-red-300/40 text-white px-4 py-3 rounded-xl mb-6 flex items-center shadow-lg">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="backdrop-blur-sm">{error}</span>
          </div>
        )}

        {/* Group Selection */}
        <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-6 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
          <div className="relative z-10">
            <label className="block text-sm font-semibold text-white mb-3 backdrop-blur-sm">
              Select Group
            </label>
            <select
              className="w-full md:w-96 px-4 py-3 bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-white/60 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              {groups.map(group => (
                <option key={group._id} value={group._id} className="bg-gray-800">
                  {group.name} ({group.members.length} members)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit New Assignment Form */}
        {selectedGroup && (
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Submit Assignment</h2>
              {showSubmitForm ? (
                <form onSubmit={handleSubmitAssignment}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-3 backdrop-blur-sm">
                        Assignment *
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-white/60 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                        value={submitData.assignmentId}
                        onChange={(e) => setSubmitData({ ...submitData, assignmentId: e.target.value })}
                      >
                        <option value="" className="bg-gray-800">Select an assignment</option>
                        {assignments.map(assignment => (
                          <option key={assignment._id} value={assignment._id} className="bg-gray-800">
                            {assignment.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white mb-3 backdrop-blur-sm">
                        Submission Link *
                      </label>
                      <input
                        type="url"
                        required
                        className="w-full px-4 py-3 bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/60 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                        value={submitData.submissionLink}
                        onChange={(e) => setSubmitData({ ...submitData, submissionLink: e.target.value })}
                        placeholder="Paste your submission link here"
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
                          Submitting...
                        </div>
                      ) : (
                        <span className="backdrop-blur-sm">Submit Assignment</span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSubmitForm(false)}
                      className="bg-white/10 backdrop-blur-lg hover:bg-white/20 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
                    >
                      <span className="backdrop-blur-sm">Cancel</span>
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setShowSubmitForm(true)}
                  className="bg-white/25 backdrop-blur-lg hover:bg-white/35 border-2 border-white/40 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
                >
                  <span className="backdrop-blur-sm">New Submission</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Submissions List */}
        <div className="space-y-6">
          {submissions.map((submission) => (
            <div key={submission._id} className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-8 relative overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                      {submission.assignment.title}
                    </h3>
                    <p className="text-white/80 backdrop-blur-sm text-lg">
                      Submitted by {submission.submittedBy.name} on{' '}
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(submission)}
                  </div>
                </div>

                {submission.submissionLink && (
                  <div className="mb-6">
                    <a
                      href={submission.submissionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/90 hover:text-white break-words backdrop-blur-sm bg-white/10 px-4 py-3 rounded-xl border border-white/20 inline-block transition-all duration-300 hover:bg-white/15"
                    >
                      {submission.submissionLink}
                    </a>
                  </div>
                )}

                {/* Two-Step Confirmation */}
                {submission.status === 'submitted' && submission.confirmationStep === 1 && (
                  <div className="bg-yellow-400/25 backdrop-blur-lg border border-yellow-300/40 rounded-2xl p-6 mb-6">
                    <p className="text-yellow-100 mb-4 backdrop-blur-sm text-lg">
                      Step 2: Please confirm your submission to finalize.
                    </p>
                    <button
                      onClick={() => handleConfirmSubmission(submission._id)}
                      className="bg-white/25 backdrop-blur-lg hover:bg-white/35 border-2 border-white/40 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
                    >
                      <span className="backdrop-blur-sm">Confirm Submission</span>
                    </button>
                  </div>
                )}

                {submission.status === 'confirmed' && (
                  <div className="bg-green-400/25 backdrop-blur-lg border border-green-300/40 rounded-2xl p-6 mb-6">
                    <p className="text-green-100 font-semibold backdrop-blur-sm text-lg">
                      ✅ Submission confirmed on {new Date(submission.confirmedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-white/80 mb-3 backdrop-blur-sm">
                    <span>Submission Progress</span>
                    <span>{submission.confirmationStep}/2 steps</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div
                      className="bg-green-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(submission.confirmationStep / 2) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {submissions.length === 0 && selectedGroup && (
          <div className="text-center py-16">
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
              <div className="relative z-10">
                <svg className="mx-auto h-16 w-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-xl font-semibold text-white backdrop-blur-sm">No submissions yet</h3>
                <p className="mt-2 text-white/80 backdrop-blur-sm max-w-md mx-auto">
                  Get started by submitting your first assignment for this group.
                </p>
                <button
                  onClick={() => setShowSubmitForm(true)}
                  className="mt-6 bg-white/25 backdrop-blur-lg hover:bg-white/35 border-2 border-white/40 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
                >
                  Submit Your First Assignment
                </button>
              </div>
            </div>
          </div>
        )}

        {!selectedGroup && (
          <div className="text-center py-16">
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
              <div className="relative z-10">
                <svg className="mx-auto h-16 w-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-4 text-xl font-semibold text-white backdrop-blur-sm">No groups available</h3>
                <p className="mt-2 text-white/80 backdrop-blur-sm max-w-md mx-auto">
                  Create or join a group first to start submitting assignments.
                </p>
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

export default Submissions;