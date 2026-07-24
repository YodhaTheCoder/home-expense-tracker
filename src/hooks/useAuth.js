import { useState, useEffect } from 'react';
import { api } from '../services/api';

import {
  login,
  logout as logoutService,
  changePassword,
  sendPasswordReset,
} from '../services/authService';

import { getProfile, updateProfile } from '../services/userService';

export function useAuth() {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState(null);

  const [message, setMessage] = useState('');

  const [loginMessage, setLoginMessage] = useState('');

  const [accountView, setAccountView] = useState(null);

  const [profileForm, setProfileForm] = useState({
    full_name: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',

    confirmPassword: '',
  });

  const [authScreen, setAuthScreen] = useState('login');

  useEffect(() => {
    async function loadSession() {
      const { data } = await api.auth.getSession();

      const sessionUser = data.session?.user;

      if (!sessionUser) {
        return;
      }

      setUser(sessionUser);

      const userProfile = await getProfile(sessionUser.id);

      setProfile(userProfile);

      setProfileForm({
        full_name: userProfile.full_name || '',
      });
    }

    loadSession();
  }, []);

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const data = await login(email, password);

      setUser(data.user);

      const userProfile = await getProfile(data.user.id);

      setProfile(userProfile);

      setProfileForm({
        full_name: userProfile.full_name || '',
      });

      setLoginMessage('Welcome back.');

      setMessage('');
    } catch (error) {
      setMessage(error.message || 'Login failed');
    }
  }

  async function saveProfile(event) {
    event.preventDefault();

    try {
      const updated = await updateProfile(user.id, profileForm.full_name);

      setProfile(updated);

      setProfileForm({
        full_name: updated.full_name || '',
      });

      setMessage('Profile updated.');

      setAccountView(null);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function savePassword(event) {
    event.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage('Passwords do not match.');

      return;
    }

    try {
      await changePassword(passwordForm.newPassword);

      setMessage('Password updated.');

      setPasswordForm({
        newPassword: '',
        confirmPassword: '',
      });

      setAccountView(null);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function logout() {
    await logoutService();

    setUser(null);

    setProfile(null);

    setEmail('');

    setPassword('');
  }

  function showForgotPassword() {
    setAuthScreen('forgot-password');
  }

  function showLogin() {
    setAuthScreen('login');
  }

  async function requestPasswordReset(email) {
    try {
      await sendPasswordReset(email);

      setMessage('Password reset link sent. Please check your email.');
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function resetPassword(newPassword) {
    try {
      await changePassword(newPassword);

      setMessage('Password updated successfully. Please login.');

      await api.auth.signOut();
      return true
    } catch (error) {
      setMessage(error.message);
      return false
    }
  }

  return {
    // login

    email,
    setEmail,

    password,
    setPassword,

    user,
    profile,

    message,

    loginMessage,

    // account

    accountView,
    setAccountView,

    profileForm,
    setProfileForm,

    passwordForm,
    setPasswordForm,

    saveProfile,

    savePassword,

    handleLogin,

    logout,
    authScreen,

    showForgotPassword,

    showLogin,

    requestPasswordReset,
    resetPassword,
  };
}
