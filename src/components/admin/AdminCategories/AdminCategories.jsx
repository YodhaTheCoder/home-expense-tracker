import CategoryForm from '../../CategoryManager/CategoryForm/CategoryForm';
import './AdminCategories.css';

export default function AdminCategories({
  user,
  categories,

  categoryForm,
  setCategoryForm,

  editingCategoryId,
  setEditingCategoryId,

  addCategory,
  saveCategory,
  editCategory,
  removeCategory,
}) {
  return (
    <>
      <div className="card">
        <h3 class="section-title">{editingCategoryId ? 'Edit Category' : 'Add Category'}</h3>

        <CategoryForm
          categoryForm={categoryForm}
          setCategoryForm={setCategoryForm}
          editingCategoryId={editingCategoryId}
          setEditingCategoryId={setEditingCategoryId}
          addCategory={addCategory}
          saveCategory={saveCategory}
          onSubmit={editingCategoryId ? saveCategory : addCategory}
          onCancel={() => {
            setEditingCategoryId(null);
            setCategoryForm({ name: '' });
          }}
        />
      </div>

      <div className="card">
        <h3 className="section-title">Category Types</h3>

        <div className="list-item list-header" style={{ fontWeight: 600 }}>
          <span>Name</span>
          <span>Actions</span>
        </div>

        {categories.map((category) => (
          <div className="list-item" key={category.id}>
            <span>
              {category.name}{' '}
              {category.is_default ? (
                <span className="pill">Default</span>
              ) : (
                <span className="pill">Custom</span>
              )}
            </span>

            <div className="inline-actions">
              {(user.role === 'admin' || category.created_by === user.id) && (
                <button className="btn btn-secondary" onClick={() => editCategory(category)}>
                  Edit
                </button>
              )}

              {(user.role === 'admin' ||
                (!category.is_default && category.created_by === user.id)) && (
                <button className="btn btn-danger" onClick={() => removeCategory(category.id)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
