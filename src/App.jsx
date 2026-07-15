import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import LoginPage from './pages/LoginPage';

import { useAuth } from './hooks/useAuth';
import { useAdmin } from './hooks/useAdmin';
import { useAccount } from './hooks/useAccount';
import './styles.css';

function App() {
  const auth = useAuth();

  const admin = useAdmin(auth.user);

  const account = useAccount(
    auth.user,
    auth.setUser
);

  if (!auth.user) {
    return <LoginPage auth={auth} />;
  }

  if (auth.user.role === 'admin') {
    return (
      <AdminDashboard
        auth={{
          ...auth,
          ...account,
          ...admin,
        }}
      />
    );
  }

  return (
    <UserDashboard
      auth={{
        ...auth,
        ...account,
      }}
    />
  );
}

export default App;
