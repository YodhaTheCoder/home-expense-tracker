import './UserForm.css';

function UserForm({ form, setForm, onSubmit, editing }) {
  return (
    <form className="user-form" onSubmit={onSubmit}>
      <div className="field">
        <label>Email</label>

        <input
          value={form.email}

          disabled={editing}

          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />
      </div>

      <div className="field">
        <label>Password</label>

        <input
          type="password"

          value={form.password}

          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />
      </div>

      <div className="field">
        <label>Full Name</label>

        <input
          value={form.full_name}

          onChange={(e) =>
            setForm({
              ...form,
              full_name: e.target.value,
            })
          }
        />
      </div>

      <div className="field">
        <label>Role</label>

        <select
          value={form.role}

          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
        >
          <option value="user">User</option>

          <option value="admin">Admin</option>
        </select>
      </div>

      <button className="btn btn-primary">{editing ? 'Update User' : 'Create User'}</button>
    </form>
  );
}

export default UserForm;
