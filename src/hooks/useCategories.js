import { useState } from 'react';

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categoryService';

export function useCategories(username) {
  const [categories, setCategories] = useState([]);

  const [message, setMessage] = useState('');

  async function loadCategories() {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function addCategory(name) {
    try {
      await createCategory({
        created_by: username,

        name: name,
      });

      setMessage('Category created.');

      await loadCategories();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function saveCategory(id, name) {
    try {
      await updateCategory(
        id,

        username,

        {
          name: name,
        }
      );

      setMessage('Category updated.');

      await loadCategories();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function removeCategory(id) {
    try {
      await deleteCategory(
        id,

        username
      );

      setMessage('Category removed.');

      await loadCategories();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return {
    categories,

    message,

    loadCategories,

    addCategory,

    saveCategory,

    removeCategory,
  };
}
