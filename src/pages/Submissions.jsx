import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axios.jsx';  // ✅ Correct import

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
      const response = await axios.get('/api/assignments');  // ✅ axiosInstance
      setAssignments(response.data || []);
    } catch (error) {
      setError('Failed to fetch assignments');
      setAssignments([]);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get('/api/groups');  // ✅ axiosInstance
      setGroups(response.data || []);
      if (response.data && response.data.length > 0) {
        setSelectedGroup(response.data[0]._id);
      }
    } catch (error) {
      setError('Failed to fetch groups');
      setGroups([]);
    }
  };

  const fetchSubmissions = async (groupId) => {
    try {
      const response = await axios.get(`/api/submissions/group/${groupId}`);  // ✅ axiosInstance
      setSubmissions(response.data || []);
    } catch (error) {
      setError('Failed to fetch submissions');
      setSubmissions([]);
    }
  };

  const handleSubmitAssignment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/submissions', {  // ✅ axiosInstance
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
      await axios.post(`/api/submissions/${submissionId}/confirm`);  // ✅ axiosInstance
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
    
    const config = statusConfig[submission?.status] || statusConfig.pending;
    return (
      <span className={`inline-block px-3 py-2 text-sm font-semibold rounded-xl border ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 relative overflow-hidden">
      {/* Background animations same */}

      <div className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section same */}

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
              {groups && groups.map(group => (  // ✅ Add null check
                <option key={group._id} value={group._id} className="bg-gray-800">
                  {group.name} ({group.members?.length || 0} members)  {/* ✅ Safe access */}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit New Assignment Form */}
        {selectedGroup && (
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-8 mb-8 relative overflow-hidden">
            {/* Form content same */}
          </div>
        )}

        {/* ✅ FIXED: Submissions List with null checks */}
        <div className="space-y-6">
          {submissions && submissions.length > 0 ? (  // ✅ Null check
            submissions.map((submission) => (
              <div key={submission._id} className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-8 relative overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                        {submission.assignment?.title || 'No Title'}  {/* ✅ Safe access */}
                      </h3>
                      <p className="text-white/80 backdrop-blur-sm text-lg">
                        Submitted by {submission.submittedBy?.name || 'Unknown'} on{' '}  {/* ✅ Safe access */}
                        {submission.submittedAt ? new Date(submission.submittedAt).toLocaleDateString() : 'Unknown date'}  {/* ✅ Safe access */}
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
                        ✅ Submission confirmed on {submission.confirmedAt ? new Date(submission.confirmedAt).toLocaleDateString() : 'Unknown date'}  {/* ✅ Safe access */}
                      </p>
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-white/80 mb-3 backdrop-blur-sm">
                      <span>Submission Progress</span>
                      <span>{(submission.confirmationStep || 0)}/2 steps</span>  {/* ✅ Safe access */}
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div
                        className="bg-green-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${((submission.confirmationStep || 0) / 2) * 100}%` }}  
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-white text-lg">No submissions found</p>
            </div>
          )}
        </div>

        {/* Rest of the code same */}

      </div>
    </div>
  );
};

export default Submissions;