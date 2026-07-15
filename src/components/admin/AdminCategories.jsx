import CategoryForm from '../CategoryForm';

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
        <h3 style={{ marginTop: 0 }}>{editingCategoryId ? 'Edit Category' : 'Add Category'}</h3>

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
        <h3 style={{ marginTop: 0 }}>Category Types</h3>

        <div className="list-item" style={{ fontWeight: 600 }}>
          <span>Name</span>
          <span>Actions</span>
        </div>

        {categories.map((category) => (
          <div className="list-item" key={category.id}>
            <span>
              {category.name}{' '}
              {category.isDefault ? (
                <span className="pill">Default</span>
              ) : (
                <span className="pill">Custom</span>
              )}
            </span>

            <div className="inline-actions">
              {(user.role === 'admin' || category.createdBy === user.username) && (
                <button className="btn btn-secondary" onClick={() => editCategory(category)}>
                  Edit
                </button>
              )}

              {(user.role === 'admin' ||
                (!category.isDefault && category.createdBy === user.username)) && (
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
