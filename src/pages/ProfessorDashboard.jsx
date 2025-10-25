import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosInstance';

const ProfessorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalAssignments: 0,
    totalSubmissions: 0,
    totalGroups: 0,
    pendingSubmissions: 0
  });
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [assignmentsRes, submissionsRes, groupsRes] = await Promise.all([
        axiosInstance.get('/api/assignments'),
        axiosInstance.get('/api/submissions'),
        axiosInstance.get('/api/groups')
      ]);

      const submissions = submissionsRes.data;
      const pendingSubmissions = submissions.filter(sub => sub.status !== 'confirmed').length;

      setStats({
        totalAssignments: assignmentsRes.data.length,
        totalSubmissions: submissions.length,
        totalGroups: groupsRes.data.length,
        pendingSubmissions
      });

      setRecentSubmissions(submissions.slice(0, 5));
      setAssignments(assignmentsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { 
        color: 'bg-yellow-400/25 border-yellow-300/40 text-yellow-100 backdrop-blur-sm', 
        text: 'Pending' 
      },
      submitted: { 
        color: 'bg-blue-400/25 border-blue-300/40 text-blue-100 backdrop-blur-sm', 
        text: 'Submitted' 
      },
      confirmed: { 
        color: 'bg-green-400/25 border-green-300/40 text-green-100 backdrop-blur-sm', 
        text: 'Confirmed' 
      }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${config.color}`}>
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
        <div className="mb-12 text-center">
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-8 relative overflow-hidden">
            {/* Glass Shine Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            
            <div className="relative z-10">
              <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Professor Dashboard
              </h1>
              <p className="text-xl text-white/90 backdrop-blur-sm max-w-2xl mx-auto">
                Monitor student progress and manage assignments with powerful tools
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Assignments Card */}
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-6 relative overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-white/25 backdrop-blur-lg rounded-2xl mr-4 border border-white/30 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white backdrop-blur-sm">Assignments</h3>
                  <p className="text-2xl font-bold text-white mt-1">{loading ? '...' : stats.totalAssignments}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submissions Card */}
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-6 relative overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-white/25 backdrop-blur-lg rounded-2xl mr-4 border border-white/30 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white backdrop-blur-sm">Submissions</h3>
                  <p className="text-2xl font-bold text-white mt-1">{loading ? '...' : stats.totalSubmissions}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Groups Card */}
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-6 relative overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-white/25 backdrop-blur-lg rounded-2xl mr-4 border border-white/30 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white backdrop-blur-sm">Groups</h3>
                  <p className="text-2xl font-bold text-white mt-1">{loading ? '...' : stats.totalGroups}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Card */}
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-6 relative overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-white/25 backdrop-blur-lg rounded-2xl mr-4 border border-white/30 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white backdrop-blur-sm">Pending</h3>
                  <p className="text-2xl font-bold text-white mt-1">{loading ? '...' : stats.pendingSubmissions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Recent Submissions */}
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg backdrop-blur-sm">
                Recent Submissions
              </h2>
              <div className="space-y-4">
                {recentSubmissions.map((submission) => (
                  <div key={submission._id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-white backdrop-blur-sm">{submission.assignment.title}</h4>
                        <p className="text-sm text-white/80 backdrop-blur-sm mt-1">
                          {submission.group.name} • {submission.submittedBy.name}
                        </p>
                      </div>
                      {getStatusBadge(submission.status)}
                    </div>
                    <p className="text-xs text-white/60 backdrop-blur-sm">
                      Submitted: {new Date(submission.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                {recentSubmissions.length === 0 && (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-white/60 mt-2 backdrop-blur-sm">No submissions yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Assignment Overview */}
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg backdrop-blur-sm">
                Assignment Overview
              </h2>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment._id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
                    <h4 className="font-semibold text-white backdrop-blur-sm mb-2">{assignment.title}</h4>
                    <p className="text-sm text-white/80 backdrop-blur-sm mb-3">{assignment.description}</p>
                    <div className="flex justify-between text-xs text-white/60 backdrop-blur-sm">
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      <span>{assignment.assignedTo === 'all' ? 'All Students' : 'Specific Groups'}</span>
                    </div>
                  </div>
                ))}
                {assignments.length === 0 && (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-white/60 mt-2 backdrop-blur-sm">No assignments created yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg backdrop-blur-sm">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                to="/assignments" 
                className="bg-white/15 backdrop-blur-lg hover:bg-white/25 border-2 border-white/30 p-6 rounded-2xl text-white transition-all duration-300 text-center hover:scale-105 hover:shadow-xl group"
              >
                <div className="p-3 bg-white/25 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2 backdrop-blur-sm">Create Assignment</h3>
                <p className="text-sm text-white/80 backdrop-blur-sm">Post new assignments for students</p>
              </Link>
              
              <Link 
                to="/submissions" 
                className="bg-white/15 backdrop-blur-lg hover:bg-white/25 border-2 border-white/30 p-6 rounded-2xl text-white transition-all duration-300 text-center hover:scale-105 hover:shadow-xl group"
              >
                <div className="p-3 bg-white/25 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2 backdrop-blur-sm">View Submissions</h3>
                <p className="text-sm text-white/80 backdrop-blur-sm">Monitor student submissions</p>
              </Link>
              
              <Link 
                to="/groups" 
                className="bg-white/15 backdrop-blur-lg hover:bg-white/25 border-2 border-white/30 p-6 rounded-2xl text-white transition-all duration-300 text-center hover:scale-105 hover:shadow-xl group"
              >
                <div className="p-3 bg-white/25 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2 backdrop-blur-sm">Manage Groups</h3>
                <p className="text-sm text-white/80 backdrop-blur-sm">View student groups</p>
              </Link>
            </div>
          </div>
        </div>
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

export default ProfessorDashboard;