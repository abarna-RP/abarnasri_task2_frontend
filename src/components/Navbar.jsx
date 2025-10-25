import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="bg-white/15 backdrop-blur-xl border-b border-white/25 shadow-2xl relative">
      {/* Glass Shine Effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-2xl font-bold text-white flex items-center hover:scale-105 transition-transform duration-300"
            >
              <div className="w-10 h-10 bg-white/25 backdrop-blur-lg rounded-xl flex items-center justify-center mr-3 border border-white/40 shadow-lg">
                <span className="text-white font-bold text-lg drop-shadow-lg">J</span>
              </div>
              <span className="drop-shadow-lg">Joineazy</span>
            </Link>
            
            <div className="hidden md:flex space-x-2">
              <Link 
                to="/" 
                className="text-white/90 hover:text-white px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/15 backdrop-blur-sm border border-transparent hover:border-white/30 flex items-center group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </Link>
              <Link 
                to="/groups" 
                className="text-white/90 hover:text-white px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/15 backdrop-blur-sm border border-transparent hover:border-white/30 flex items-center group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Groups
              </Link>
              <Link 
                to="/assignments" 
                className="text-white/90 hover:text-white px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/15 backdrop-blur-sm border border-transparent hover:border-white/30 flex items-center group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Assignments
              </Link>
              <Link 
                to="/submissions" 
                className="text-white/90 hover:text-white px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/15 backdrop-blur-sm border border-transparent hover:border-white/30 flex items-center group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Submissions
              </Link>
              {user.role === 'professor' && (
                <Link 
                  to="/professor" 
                  className="text-white/90 hover:text-white px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/15 backdrop-blur-sm border border-transparent hover:border-white/30 flex items-center group"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                  Professor
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl px-4 py-2">
              <span className="text-white/90 text-sm">
                Welcome, <span className="font-semibold text-white drop-shadow-lg">{user.name}</span>
              </span>
              <span className="text-white/60 text-xs ml-2 bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
                {user.role === 'professor' ? 'Professor' : 'Student'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/25 backdrop-blur-lg hover:bg-white/35 border-2 border-white/40 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Optional) */}
      <div className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/20">
        <div className="px-4 py-2 flex space-x-4 overflow-x-auto">
          <Link to="/" className="text-white/90 hover:text-white px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 text-sm whitespace-nowrap flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </Link>
          <Link to="/groups" className="text-white/90 hover:text-white px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 text-sm whitespace-nowrap flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Groups
          </Link>
          <Link to="/assignments" className="text-white/90 hover:text-white px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 text-sm whitespace-nowrap flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Assignments
          </Link>
          <Link to="/submissions" className="text-white/90 hover:text-white px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 text-sm whitespace-nowrap flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Submissions
          </Link>
          {user.role === 'professor' && (
            <Link to="/professor" className="text-white/90 hover:text-white px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 text-sm whitespace-nowrap flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              </svg>
              Professor
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;