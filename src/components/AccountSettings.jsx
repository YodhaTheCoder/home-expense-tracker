import React from 'react';

function AccountSettings({ auth }) {

  const {
    accountView,
    message,
    user,
    profileForm,
    setProfileForm,
    passwordForm,
    setPasswordForm,
    saveProfile,
    savePassword,
    setAccountView,
    setShowMenu,
  } = auth;



  const backToPortal = () => {

    setAccountView(null);
    setShowMenu(false);

  };



  return (

    <div className="settings-container">


      <div className="card settings-header">


        <div className="profile-top">


          <div className="category-icon user-icon">

            {(user.fullname || user.username)
              .charAt(0)
              .toUpperCase()
            }

          </div>



          <div>

            <h2>
              {
                accountView === 'profile'
                ? 'Profile Settings'
                : 'Password Settings'
              }
            </h2>


            <p className="muted">
              Manage your account information and security
            </p>

          </div>


        </div>


      </div>





      {message && (

        <div className="card settings-message">

          {message}

        </div>

      )}




      <div className="card settings-form">


        {accountView === 'profile' ? (


          <form onSubmit={saveProfile}>


            <div className="field">

              <label>
                Display Name
              </label>


              <input

                value={
                  profileForm.full_name ||
                  profileForm.fullname ||
                  ""
                }


                onChange={(e)=>
                  setProfileForm(prev=>({
                    ...prev,
                    full_name:e.target.value,
                  }))
                }


                placeholder={user.fullname}

              />


            </div>



            <div className="settings-actions">


              <button
                className="category-btn edit"
                type="submit"
              >
                Save Profile
              </button>



              <button
                className="category-btn delete"
                type="button"
                onClick={backToPortal}
              >
                Back
              </button>


            </div>



          </form>



        ) : (


          <form onSubmit={savePassword}>


            <div className="field">

              <label>
                Current Password
              </label>


              <input

                type="password"

                value={passwordForm.currentPassword}


                onChange={(e)=>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword:e.target.value,
                  })
                }


                required

              />

            </div>




            <div className="field">

              <label>
                New Password
              </label>


              <input

                type="password"

                value={passwordForm.newPassword}


                onChange={(e)=>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword:e.target.value,
                  })
                }


                required

              />

            </div>





            <div className="field">

              <label>
                Confirm New Password
              </label>


              <input

                type="password"

                value={passwordForm.confirmPassword}


                onChange={(e)=>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword:e.target.value,
                  })
                }


                required

              />


            </div>




            <div className="settings-actions">


              <button
                className="category-btn edit"
                type="submit"
              >
                Update Password
              </button>



              <button
                className="category-btn delete"
                type="button"
                onClick={backToPortal}
              >
                Back
              </button>


            </div>



          </form>


        )}


      </div>


    </div>

  );

}


export default AccountSettings;