import LoginScreen from '../components/Auth/LoginScreen.jsx';

export default function LoginPage({ auth }) {
  return (
    <LoginScreen
      email={auth.email}
      password={auth.password}
      onEmailChange={auth.setEmail}
      onPasswordChange={auth.setPassword}
      onSubmit={auth.handleLogin}
      onForgotPassword={auth.showForgotPassword}
      message={auth.message}
    />
  );
}
