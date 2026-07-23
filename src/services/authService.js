import { api } from './api';

export async function login(email, password) {
  const { data, error } = await api.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function logout() {
  const { error } = await api.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function changePassword(newPassword) {
  const { data, error } = await api.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function sendPasswordReset(email) {
  const redirectTo = 'https://yodhathecoder.github.io/home-expense-tracker/reset-password';

  const { error } = await api.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) {
    throw new Error(error.message);
  }

  return true;
}
