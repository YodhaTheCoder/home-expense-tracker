import { useState, useEffect } from 'react';

import {
  getUsers,
  createUser as createUserApi,
  updateUser,
  deleteUser as deleteUserApi,
} from '../services/userService';

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categoryService';

import { getSummary } from '../services/summaryService';

export function useAdmin(user) {
  const [users, setUsers] = useState([]);

  const [categories, setCategories] = useState([]);

  const [summary, setSummary] = useState(null);

  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');

  const [message, setMessage] = useState('');

  // category states

  const [categoryForm, setCategoryForm] = useState({
    name: '',
  });

  const [editingCategoryId, setEditingCategoryId] = useState(null);

  // user states

  const [userForm, setUserForm] = useState({
    username: '',
    password: '',
    full_name: '',
    role: 'user',
  });

  const [editingUserName, setEditingUserName] = useState(null);

  async function loadAdminData() {
    if (!user) {
      return;
    }
    try {
      const [usersData, categoriesData, summaryData] = await Promise.all([
        getUsers(),

        getCategories(),

        getSummary(),
      ]);

      setUsers(usersData);

      setCategories(categoriesData);

      setSummary(summaryData);
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    if (user && user.role === 'admin') {
      loadAdminData();
    }
  }, [user]);

  async function addCategory(event) {
    event.preventDefault();

    try {
      await createCategory({
        created_by: user.username,

        name: categoryForm.name,
      });

      setCategoryForm({
        name: '',
      });

      setMessage('Category created.');

      loadAdminData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function editCategory(category) {
    setEditingCategoryId(category.id);

    setCategoryForm({
      name: category.name,
    });
  }

  async function saveCategory(event) {
    event.preventDefault();

    try {
      await updateCategory(
        editingCategoryId,

        user.username,

        {
          name: categoryForm.name,
        }
      );

      setEditingCategoryId(null);

      setCategoryForm({
        name: '',
      });

      setMessage('Category updated.');

      loadAdminData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function removeCategory(id) {
    try {
      await deleteCategory(
        id,

        user.username
      );

      setMessage('Category removed.');

      loadAdminData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function createUser(event) {
    event.preventDefault();

    try {
      await createUserApi(userForm);

      setUserForm({
        username: '',
        password: '',
        full_name: '',
        role: 'user',
      });

      setMessage('User created.');

      loadAdminData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function editUser(item) {
    setEditingUserName(item.username);

    setUserForm({
      username: item.username,

      password: '',

      full_name: item.full_name,

      role: item.role,
    });
  }

  async function saveUser(event) {
    event.preventDefault();

    try {
      await updateUser(
        editingUserName,

        userForm
      );

      setEditingUserName(null);

      setUserForm({
        username: '',
        password: '',
        full_name: '',
        role: 'user',
      });

      setMessage('User updated.');

      loadAdminData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteUser(username) {
    try {
      await deleteUserApi(username);

      setMessage('User deleted.');

      loadAdminData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return {
    users,

    categories,

    summary,

    activeAdminTab,

    setActiveAdminTab,

    message,

    categoryForm,

    setCategoryForm,

    editingCategoryId,

    setEditingCategoryId,

    userForm,

    setUserForm,

    editingUserName,

    setEditingUserName,

    loadAdminData,

    addCategory,

    editCategory,

    saveCategory,

    removeCategory,

    createUser,

    editUser,

    saveUser,

    deleteUser,
  };
}
