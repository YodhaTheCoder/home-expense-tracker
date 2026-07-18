import CategoryForm from './CategoryForm/CategoryForm.jsx';
import CategoryList from './CategoryList/CategoryList.jsx';
import './CategoryManager.css';

export default function CategoryManager({
  categories,

  user,

  isAdmin,

  categoryForm,
  setCategoryForm,

  editingCategoryId,
  setEditingCategoryId,

  addCategory,
  saveCategory,
  editCategory,
  removeCategory,
}) {
  function canModify(category) {
    // Admin can modify every category
    if (isAdmin) {
      return true;
    }

    // User can modify only their own categories
    return category.created_by === user.id;
  }

  function handleDelete(category) {
    if (canModify(category)) {
      removeCategory(category.id);
    }
  }

  function handleEdit(category) {
    if (canModify(category)) {
      setEditingCategoryId(category.id);

      setCategoryForm({
        name: category.name,
      });
    }
  }

  return (
    <div className="category-manager">
      <CategoryForm
        categoryForm={categoryForm}

        setCategoryForm={setCategoryForm}

        editingCategoryId={editingCategoryId}

        setEditingCategoryId={setEditingCategoryId}

        addCategory={addCategory}

        saveCategory={saveCategory}
      />

      <CategoryList
        categories={categories}

        onEdit={handleEdit}

        onDelete={handleDelete}

        canModify={canModify}
      />
    </div>
  );
}
