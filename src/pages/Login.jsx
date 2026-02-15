import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';

const Galaxy = lazy(() => import('../components/Galaxy'));

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);

  // Redirect if already logged in
  useEffect(() => {
    if (authStatus) {
      navigate('/');
    }
  }, [authStatus, navigate]);

  const login = async (data) => {
    setError('');
    setLoading(true);
    try {
      // First, try to logout any existing session
      try {
        await authService.logout();
      } catch {
        // Ignore logout errors, user might not have an active session
        console.log('No active session to logout');
      }

      // Now proceed with login
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/');
      }
    } catch (error) {
      setError(error.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b14] relative overflow-hidden">
      {/* Navbar */}
      <Navbar position="fixed" scrollBehavior={false} />

      {/* Galaxy Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Suspense fallback={<div className="w-full h-full bg-[#0a0b14]" />}>
          <Galaxy
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1.5}
            glowIntensity={0.5}
            saturation={0.2}
            hueShift={200}
            transparent={false}
            repulsionStrength={3}
            twinkleIntensity={0.5}
          />
        </Suspense>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b14]/50 via-[#0a0b14]/70 to-[#0a0b14] z-10" />

      {/* Login Form */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-24">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-8 md:p-10">
            {/* Logo */}
            <div className="mb-6 flex justify-center">
              <img src="/wlogo.webp" alt="The Jargonaut Logo" className="h-16 w-auto" />
            </div>

            {/* Title */}
            <h2 className="text-center text-3xl font-bold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-white/60 mb-8">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-white font-semibold hover:underline transition-all"
              >
                Sign Up
              </Link>
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-200 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(login)} className="space-y-5">
              {/* Email Input */}
              <div className="w-full">
                <label htmlFor="email" className="block text-white/90 mb-2 font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-red-300 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="w-full">
                <label htmlFor="password" className="block text-white/90 mb-2 font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                />
                {errors.password && (
                  <p className="mt-1 text-red-300 text-sm">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white/20 hover:bg-white/30 disabled:bg-white/10 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-full border border-white/30 transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Login;
