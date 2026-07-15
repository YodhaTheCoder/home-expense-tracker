import { useState } from 'react';

function PortalShell({
  title,
  subtitle,
  navItems,
  activeNav,
  onNavigate,
  actions,
  children,
  auth,
}) {

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);


  const username = auth.user?.username || 'User';


  const handleNavigate = (id) => {

    onNavigate(id);

    setShowMobileNav(false);

  };


  return (

    <div className="app-shell">


      {/* Top Header */}

      <header className="dashboard-header">

 
     
          <button

            className="mobile-menu-btn"

            onClick={() =>
              setShowMobileNav(!showMobileNav)
            }

          >
            ☰
          </button>


 <div className="desktop-brand">
    Expense Tracker
  </div>
       

          <div className="mobile-brand">

            Expense Tracker

          </div>


       




        <div className="header-profile">


          {actions}



          <div className="profile-container">


            <button

              className="profile-btn"

              onClick={() =>
                setShowProfileMenu(!showProfileMenu)
              }

            >

              <div className="profile-avatar">

                {username
                  .charAt(0)
                  .toUpperCase()
                }

              </div>


            </button>





            {showProfileMenu && (

              <div className="profile-menu">


                <div className="profile-header">


                  <strong>

                    {
                      auth.user?.fullname ||
                      auth.user?.username
                    }

                  </strong>



                  <span>

                    {auth.user?.role}

                  </span>


                </div>





                <button

                  onClick={() => {

                    auth.setAccountView('profile');

                    setShowProfileMenu(false);

                  }}

                >

                  Profile Settings

                </button>





                <button

                  onClick={() => {

                    auth.setAccountView('password');

                    setShowProfileMenu(false);

                  }}

                >

                  Change Password

                </button>





                <button

                  onClick={auth.logout}

                >

                  Logout

                </button>


              </div>

            )}



          </div>


        </div>


      </header>






      <div className="dashboard-layout">



        {/* Sidebar */}


        <aside

          className={`sidebar ${
            showMobileNav
              ? 'mobile-open'
              : ''
          }`}

        >


          {navItems.map((item)=>(


            <button

              key={item.id}

              className={`nav-btn ${
                activeNav === item.id
                  ? 'active'
                  : ''
              }`}

              onClick={() =>
                handleNavigate(item.id)
              }

            >

              {item.label}

            </button>


          ))}


        </aside>







        {/* Main Content */}


        <main className="main">


          <div className="page-title">


            <h2>

              {title}

            </h2>



            <p className="muted">

              {subtitle}

            </p>


          </div>





          {children}



        </main>


      </div>


    </div>

  );

}


export default PortalShell;