import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

const Galaxy = lazy(() => import('../components/Galaxy'));

function Login({ position = 'absolute', scrollBehavior = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const authStatus = useSelector((state) => state.auth.status);

  // Redirect if already logged in
  useEffect(() => {
    if (authStatus) navigate('/');
  }, [authStatus, navigate]);

  // Scroll behavior
  useEffect(() => {
    if (!scrollBehavior) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, scrollBehavior]);

  const login = async (data) => {
    setError('');
    setLoading(true);

    try {
      try {
        await authService.logout();
      } catch {}

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

  const positionClass = scrollBehavior
    ? `fixed left-4 right-4 z-50 transition-all duration-300 ${isNavVisible ? 'top-4' : '-top-24'}`
    : `${position} top-4 left-4 right-4 z-50`;

  return (
    <div className="min-h-screen bg-[#0a0b14] relative overflow-hidden">

      {/* Back Button */}
      <div className={positionClass}>
        <button
          onClick={() => navigate('/')}
          className=" bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl py-3 px-4 text-slate-200 hover:bg-white/20 font-semibold"
        >
          Back to Home
        </button>
      </div>

      {/* Galaxy Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Suspense fallback={<div className="w-full h-full bg-[#0a0b14]" />}>
          <Galaxy
            mouseRepulsion
            mouseInteraction
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b14]/50 via-[#0a0b14]/70 to-[#0a0b14] z-10" />

      {/* Login Form */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-24">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-8 md:p-10">

          <div className="mb-6 flex justify-center">
            <img src="/wlogo.webp" alt="Logo" className="h-16 w-auto" />
          </div>

          <h2 className="text-center text-3xl font-bold text-white mb-6">
            Welcome Back
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(login)} className="space-y-5">

            <div>
              <label className="block text-white/90 mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
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

            <div>
              <label className="block text-white/90 mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white/20 hover:bg-white/30 disabled:bg-white/10 text-white font-semibold py-3 px-6 rounded-full border border-white/30 transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
