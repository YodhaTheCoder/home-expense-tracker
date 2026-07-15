function UserManagement({
  users,
  userForm,
  setUserForm,
  editingUserName,
  setEditingUserName,
  createUser,
  editUser,
  saveUser,
  deleteUser,
}) {

  const resetForm = () => {

    setEditingUserName(null);

    setUserForm({
      username:'',
      password:'',
      full_name:'',
      role:'user',
    });

  };


  return (
    <>

      {/* User Form */}

      <div className="card user-form-card">

        <div className="section-header">

          <div>

            <h3>
              {editingUserName
                ? 'Edit User'
                : 'Create User'
              }
            </h3>

            <p className="muted">
              Manage account details and permissions
            </p>

          </div>

        </div>



        <form
          onSubmit={
            editingUserName
            ? saveUser
            : createUser
          }
        >


          <div className="user-form-grid">


            <div className="field">

              <label>
                Username
              </label>

              <input
                value={userForm.username}
                disabled={Boolean(editingUserName)}
                required={!editingUserName}

                onChange={(e)=>
                  setUserForm({
                    ...userForm,
                    username:e.target.value,
                  })
                }
              />

            </div>




            <div className="field">

              <label>
                Password
              </label>

              <input
                type="password"
                value={userForm.password}
                required={!editingUserName}

                onChange={(e)=>
                  setUserForm({
                    ...userForm,
                    password:e.target.value,
                  })
                }
              />

            </div>




            <div className="field">

              <label>
                Full Name
              </label>


              <input

                value={userForm.full_name}

                required={!editingUserName}

                onChange={(e)=>
                  setUserForm({
                    ...userForm,
                    full_name:e.target.value,
                  })
                }

              />

            </div>




            <div className="field">

              <label>
                Role
              </label>


              <select

                value={userForm.role}

                onChange={(e)=>
                  setUserForm({
                    ...userForm,
                    role:e.target.value,
                  })
                }

              >

                <option value="user">
                  User
                </option>


                <option value="admin">
                  Admin
                </option>

              </select>


            </div>


          </div>




          <div className="category-actions">

            <button
              className="category-btn edit"
              type="submit"
            >

              {editingUserName
                ? 'Save User'
                : 'Create User'
              }

            </button>



            {editingUserName && (

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

      <p className="muted">
        Manage registered users and permissions
      </p>
    </div>


    <span className="category-count">
      {users.length} Users
    </span>

  </div>



  <div className="category-grid">

    {users.map((item) => (

      <div
        key={item.username}
        className="category-card user-card"
      >


        <div className="category-top">


          <div className="category-icon user-icon">
            {item.fullname
              ? item.fullname.charAt(0).toUpperCase()
              : item.username.charAt(0).toUpperCase()
            }
          </div>



          <div className="category-details">

            <h4>
              {item.fullname || item.username}
            </h4>


            <p className="muted username-text">
              @{item.username}
            </p>


            <span
              className={
                item.role === "admin"
                ? "category-type default-type"
                : "category-type custom-type"
              }
            >
              {item.role}
            </span>


          </div>


        </div>




        <div className="category-actions">


          <button
            className="category-btn edit"
            onClick={() => editUser(item)}
          >
            Edit
          </button>



          <button
            className="category-btn delete"
            onClick={() => deleteUser(item.username)}
          >
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