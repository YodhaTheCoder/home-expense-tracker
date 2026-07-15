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

  async function saveUser(userForm, editingUserName) {
    try {
      if (editingUserName) {
        await updateUser(editingUserName, {
          password: userForm.password || undefined,
          full_name: userForm.full_name,
          role: userForm.role,
        });

        setMessage('User updated.');
      } else {
        await createUser({
          username: userForm.username,

          password: userForm.password,

          full_name: userForm.full_name,

          role: userForm.role,
        });

        setMessage('User created.');
      }

      await loadUsers();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function removeUser(username) {
    try {
      await deleteUser(username);

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
