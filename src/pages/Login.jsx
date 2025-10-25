import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosInstance';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
        {[...Array(20)].map((_, i) => (
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

      <div className="relative flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Enhanced Glass Card */}
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/25 p-8 relative overflow-hidden">
            {/* Glass Shine Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

            {/* Header */}
            <div className="relative z-10 text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-white/25 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-4 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="text-white text-3xl font-bold drop-shadow-lg">J</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                Welcome Back
              </h2>
              <p className="text-white/90 backdrop-blur-sm">Sign in to your Joineazy account</p>
            </div>

            {error && (
              <div className="relative z-10 bg-red-400/25 backdrop-blur-lg border border-red-300/40 text-white px-4 py-3 rounded-xl mb-6 flex items-center shadow-lg">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="backdrop-blur-sm">{error}</span>
              </div>
            )}

            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3 backdrop-blur-sm">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-4 bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/60 focus:border-white/40 focus:bg-white/20 transition-all duration-300 shadow-lg"
                    placeholder="username@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3 backdrop-blur-sm">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-4 bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/60 focus:border-white/40 focus:bg-white/20 transition-all duration-300 shadow-lg"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              

               

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white/25 backdrop-blur-lg hover:bg-white/35 border-2 border-white/40 text-white py-4 px-4 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center backdrop-blur-sm">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  <span className="backdrop-blur-sm">Sign in to your account</span>
                )}
              </button>

             {/* Register Link */}
              <div className="text-center">
                <p className="text-white/90 backdrop-blur-sm">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-white hover:text-white font-semibold transition-colors duration-200 underline backdrop-blur-sm">
                    Create account
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-white/70 text-sm backdrop-blur-sm">
              © 2025 Joineazy. All rights reserved.
            </p>
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
        
        .hover-scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default Login;