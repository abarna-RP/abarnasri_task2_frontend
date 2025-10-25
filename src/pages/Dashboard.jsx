import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axios';
import axios from 'axios'
const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    groups: 0,
    assignments: 0,
    submissions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [groupsRes, assignmentsRes, submissionsRes] = await Promise.all([
        axios.get('/api/groups'),
        axios.get('/api/assignments'),
        user.role === 'professor' 
          ? axios.get('/api/submissions')
          : Promise.resolve({ data: [] })
      ]);

      setStats({
        groups: groupsRes.data.length,
        assignments: assignmentsRes.data.length,
        submissions: submissionsRes.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
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
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-8 relative overflow-hidden">
            {/* Glass Shine Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            
            <div className="relative z-10">
              <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-xl text-white/90 backdrop-blur-sm max-w-2xl mx-auto">
                {user?.role === 'professor' 
                  ? 'Manage assignments and track student progress with powerful tools' 
                  : 'Collaborate with your group and submit assignments seamlessly'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Groups Card */}
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-8 relative overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-white/25 backdrop-blur-lg rounded-2xl mr-6 border border-white/30 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white backdrop-blur-sm">Groups</h3>
                  <p className="text-3xl font-bold text-white mt-1">{loading ? '...' : stats.groups}</p>
                </div>
              </div>
              <Link 
                to="/groups" 
                className="w-full bg-white/25 backdrop-blur-lg hover:bg-white/35 border-2 border-white/40 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg active:scale-95"
              >
                <span className="backdrop-blur-sm">Manage Groups</span>
              </Link>
            </div>
          </div>

          {/* Assignments Card */}
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-8 relative overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-white/25 backdrop-blur-lg rounded-2xl mr-6 border border-white/30 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white backdrop-blur-sm">Assignments</h3>
                  <p className="text-3xl font-bold text-white mt-1">{loading ? '...' : stats.assignments}</p>
                </div>
              </div>
              <Link 
                to="/assignments" 
                className="w-full bg-white/25 backdrop-blur-lg hover:bg-white/35 border-2 border-white/40 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg active:scale-95"
              >
                <span className="backdrop-blur-sm">View Assignments</span>
              </Link>
            </div>
          </div>

          {/* Submissions Card */}
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-8 relative overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-white/25 backdrop-blur-lg rounded-2xl mr-6 border border-white/30 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white backdrop-blur-sm">Submissions</h3>
                  <p className="text-3xl font-bold text-white mt-1">{loading ? '...' : stats.submissions}</p>
                </div>
              </div>
              <Link 
                to="/submissions" 
                className="w-full bg-white/25 backdrop-blur-lg hover:bg-white/35 border-2 border-white/40 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg active:scale-95"
              >
                <span className="backdrop-blur-sm">Track Progress</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/25 p-8 relative overflow-hidden">
          {/* Glass Shine Effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg backdrop-blur-sm">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link 
                to="/groups" 
                className="bg-white/15 backdrop-blur-lg hover:bg-white/25 border-2 border-white/30 p-6 rounded-2xl text-white transition-all duration-300 text-center hover:scale-105 hover:shadow-xl group"
              >
                <div className="p-3 bg-white/25 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2 backdrop-blur-sm">Create Group</h3>
                <p className="text-sm text-white/80 backdrop-blur-sm">Start a new collaboration</p>
              </Link>
              
              <Link 
                to="/assignments" 
                className="bg-white/15 backdrop-blur-lg hover:bg-white/25 border-2 border-white/30 p-6 rounded-2xl text-white transition-all duration-300 text-center hover:scale-105 hover:shadow-xl group"
              >
                <div className="p-3 bg-white/25 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2 backdrop-blur-sm">View Assignments</h3>
                <p className="text-sm text-white/80 backdrop-blur-sm">Check latest work</p>
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
                <h3 className="font-semibold text-lg mb-2 backdrop-blur-sm">Submit Work</h3>
                <p className="text-sm text-white/80 backdrop-blur-sm">Confirm submissions</p>
              </Link>
              
              {user.role === 'professor' && (
                <Link 
                  to="/professor" 
                  className="bg-white/15 backdrop-blur-lg hover:bg-white/25 border-2 border-white/30 p-6 rounded-2xl text-white transition-all duration-300 text-center hover:scale-105 hover:shadow-xl group"
                >
                  <div className="p-3 bg-white/25 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 backdrop-blur-sm">Professor Tools</h3>
                  <p className="text-sm text-white/80 backdrop-blur-sm">Manage courses</p>
                </Link>
              )}
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

export default Dashboard;