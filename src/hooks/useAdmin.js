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

export function useAdmin(user, profile) {
  const [users, setUsers] = useState([]);

  const [categories, setCategories] = useState([]);

  const [summary, setSummary] = useState(null);

  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');

  const [message, setMessage] = useState('');

  const [categoryForm, setCategoryForm] = useState({
    name: '',
  });

  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const [userForm, setUserForm] = useState({
    email: '',

    password: '',

    full_name: '',

    role: 'user',
  });

  const [editingUserId, setEditingUserId] = useState(null);

  async function loadAdminData(filters = {}) {
    if (!user) {
      return;
    }

    try {
      const [usersData, categoriesData, summaryData] = await Promise.all([
        getUsers(),

        getCategories(),

        getSummary(null, filters),
      ]);

      setUsers(usersData);

      setCategories(categoriesData);

      setSummary(summaryData);
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    if (user && ['super_admin', 'admin'].includes(profile?.role)) {
      loadAdminData();
    }
  }, [user, profile]);

  async function addCategory(event) {
    event.preventDefault();

    try {
      await createCategory({
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
      await deleteCategory(id);

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
        email: '',
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
    setEditingUserId(item.id);

    setUserForm({
      email: item.email || '',

      password: '',

      full_name: item.full_name,

      role: item.role,
    });
  }

  async function saveUser(event) {
    event.preventDefault();

    try {
      await updateUser(
        editingUserId,

        {
          full_name: userForm.full_name,

          role: userForm.role,
        }
      );

      setEditingUserId(null);

      setUserForm({
        email: '',
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

  async function deleteUser(id) {
    try {
      await deleteUserApi(id);

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

    editingUserId,

    setEditingUserId,

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
