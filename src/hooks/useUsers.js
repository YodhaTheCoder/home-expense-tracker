import { useState } from 'react';

import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';

export function useUsers() {
  const [users, setUsers] = useState([]);

  const [message, setMessage] = useState('');

  async function loadUsers() {
    try {
      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function saveUser(userForm, editingUserId) {
    try {
      if (editingUserId) {
        await updateUser(editingUserId, {
          full_name: userForm.full_name,
          role: userForm.role,
        });

        setMessage('User updated.');
      } else {
        await createUser({
          email: userForm.email,

          password: userForm.password,

          full_name: userForm.full_name,

          role: userForm.role || 'user',
        });

        setMessage('User created.');
      }

      await loadUsers();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function removeUser(userId) {
    try {
      await deleteUser(userId);

      setMessage('User removed.');

      await loadUsers();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return {
    users,

    message,

    loadUsers,

    saveUser,

    removeUser,
  };
}
