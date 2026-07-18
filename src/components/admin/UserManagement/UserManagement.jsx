import './UserManagement.css';

function UserManagement({
  users,
  userForm,
  setUserForm,
  editingUserId,
  setEditingUserId,
  createUser,
  editUser,
  saveUser,
  deleteUser,
}) {
  const resetForm = () => {
    setEditingUserId(null);

    setUserForm({
      email: '',
      password: '',
      full_name: '',
      role: 'user',
    });
  };

  return (
    <>
      {/* User Form */}

      <div className="card user-form-card">
        <div className="section-header">
          <div>
            <h3>{editingUserId ? 'Edit User' : 'Create User'}</h3>

            <p className="muted">Manage account details and permissions</p>
          </div>
        </div>

        <form onSubmit={editingUserId ? saveUser : createUser}>
          <div className="user-form-grid">
            <div className="field">
              <label>Email</label>

              <input
                value={userForm.email}
                disabled={Boolean(editingUserId)}
                required={!editingUserId}

                onChange={(e) =>
                  setUserForm({
                    ...userForm,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="field">
              <label>Password</label>

              <input
                type="password"
                value={userForm.password}
                required={!editingUserId}

                onChange={(e) =>
                  setUserForm({
                    ...userForm,
                    password: e.target.value,
                  })
                }
              />
            </div>

            <div className="field">
              <label>Full Name</label>

              <input
                value={userForm.full_name}

                required={!editingUserId}

                onChange={(e) =>
                  setUserForm({
                    ...userForm,
                    full_name: e.target.value,
                  })
                }
              />
            </div>

            <div className="field">
              <label>Role</label>

              <select
                value={userForm.role}

                onChange={(e) =>
                  setUserForm({
                    ...userForm,
                    role: e.target.value,
                  })
                }
              >
                <option value="user">User</option>

                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
          </div>

          <div className="category-actions">
            <button className="category-btn edit" type="submit">
              {editingUserId ? 'Save User' : 'Create User'}
            </button>

            {editingUserId && (
              <button
                type="button"

                className="category-btn delete"

                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* User List */}

      <div className="card user-list-card">
        <div className="section-header">
          <div>
            <h3>User Directory</h3>

            <p className="muted">Manage registered users and permissions</p>
          </div>

          <span className="category-count">{users.length} Users</span>
        </div>

        <div className="category-grid">
          {users.map((item) => (
            <div key={item.id} className="category-card user-card">
              <div className="category-top">
                <div className="category-icon user-icon">
                  {item.full_name
                    ? item.full_name.charAt(0).toUpperCase()
                    : item.email.charAt(0).toUpperCase()}
                </div>

                <div className="category-details">
                  <h4>{item.full_name || item.email}</h4>

                  <p className="muted username-text">@{item.email}</p>

                  <span
                    className={
                      item.role === 'admin'
                        ? 'category-type default-type'
                        : 'category-type custom-type'
                    }
                  >
                    {item.role}
                  </span>
                </div>
              </div>

              <div className="category-actions">
                <button className="category-btn edit" onClick={() => editUser(item)}>
                  Edit
                </button>

                <button className="category-btn delete" onClick={() => deleteUser(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserManagement;
