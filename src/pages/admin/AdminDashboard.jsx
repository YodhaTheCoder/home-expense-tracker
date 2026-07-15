import { useEffect } from 'react';

import PortalShell from '../../components/PortalShell';
import AccountSettings from '../../components/AccountSettings';
import Stats from '../../components/Stats';
import CategoryManager from '../../components/CategoryManager';
import UserManagement from '../../components/admin/UserManagement';

function AdminDashboard({ auth }) {
  const {
    user,
    logout,
    message,
    loginMessage,

    users,
    categories,
    summary,

    activeAdminTab,
    setActiveAdminTab,

    showMenu,
    setShowMenu,

    accountView,
    setAccountView,

    categoryForm,
    setCategoryForm,

    editingCategoryId,
    setEditingCategoryId,

    userForm,
    setUserForm,

    editingUserName,
    setEditingUserName,

    addCategory,
    saveCategory,
    editCategory,
    removeCategory,

    createUser,
    editUser,
    deleteUser,
  } = auth;

  useEffect(() => {
    auth.loadAdminData();
  }, [auth]);


   if (accountView) {
    return <AccountSettings auth={auth} />;
  }

  return (
    <PortalShell
      auth={auth}

      title="Admin Portal"

      subtitle="Manage categories, users, and review organization-wide spending."

      navItems={[
        {
          id: 'dashboard',
          label: 'Dashboard',
        },
        {
          id: 'categories',
          label: 'Categories',
        },
        {
          id: 'users',
          label: 'Users',
        },
      ]}

      activeNav={activeAdminTab}

      onNavigate={setActiveAdminTab}
    >
      {activeAdminTab === 'dashboard' && (
  <Stats
    summary={summary}
    users={users}
    categories={categories}
    showUsers={true}
    showUserTotals={true}
  />
)}

      {activeAdminTab === 'categories' && (
        <CategoryManager
          categories={categories}

          user={user}

          isAdmin={true}

          categoryForm={categoryForm}

          setCategoryForm={setCategoryForm}

          editingCategoryId={editingCategoryId}

          setEditingCategoryId={setEditingCategoryId}

          addCategory={(name) => {
            addCategory(
              {
                preventDefault: () => {},
              },
              name
            );
          }}

          saveCategory={(id, name) => {
            saveCategory(
              {
                preventDefault: () => {},
              },
              id,
              name
            );
          }}

          editCategory={editCategory}

          removeCategory={removeCategory}
        />
      )}

      {activeAdminTab === 'users' && <UserManagement {...auth} />}
    </PortalShell>
  );
}

export default AdminDashboard;
