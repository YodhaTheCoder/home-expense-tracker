import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import LoginPage from './pages/LoginPage';

import ForgotPassword from './components/Auth/ForgotPassword.jsx';
import ResetPassword from './components/Auth/ResetPassword.jsx';

import { useAuth } from './hooks/useAuth';
import { useAdmin } from './hooks/useAdmin';

import './styles.css';

function App() {
  const auth = useAuth();

  const admin = useAdmin(auth.user, auth.profile);

  const hash = window.location.hash;

  // Password reset link from email
  if (hash === "#/reset-password") {
    return <ResetPassword onReset={auth.resetPassword} message={auth.message} />;
  }

  if (!auth.user) {
    if (auth.authScreen === 'forgot-password') {
      return (
        <ForgotPassword
          onBack={auth.showLogin}
          onSendReset={auth.requestPasswordReset}
          message={auth.message}
        />
      );
    }
    return <LoginPage auth={auth} />;
  }

  const isAdmin = ['admin', 'super_admin'].includes(auth.profile?.role);

  if (isAdmin) {
    return (
      <AdminDashboard
        auth={{
          ...auth,
          ...admin,
        }}
      />
    );
  }

  return (
    <UserDashboard
      auth={{
        ...auth,
      }}
    />
  );
}

export default App;
