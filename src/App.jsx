import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import './App.css';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is already logged in on app load
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => {
        dispatch(logout());
      });
  }, [dispatch]);

  // Render immediately; protected routes wait for the auth check themselves
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

 