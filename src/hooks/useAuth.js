import { useState } from 'react';
import { login } from '../services/authService';

export function useAuth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const [accountView, setAccountView] = useState(null);

const [profileForm, setProfileForm] = useState({
    full_name: ""
});

const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
});

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const data = await login(username, password);

      setUser(data.user);

      setMessage('');

      setLoginMessage('Welcome back.');
    } catch (error) {
      setMessage(error.message || 'Login failed');
    }
  }

  function logout() {
    setUser(null);
    // setUsername("");
    // setPassword("");
  }

  return {
    username,
    setUsername,

    password,
    setPassword,

    user,
     setUser,

    message,

    loginMessage,

    accountView,
setAccountView,

profileForm,
setProfileForm,

passwordForm,
setPasswordForm,

    handleLogin,

    logout,
  };
}
