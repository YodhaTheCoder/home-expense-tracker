import LoginScreen from '../components/LoginScreen';

export default function LoginPage({ auth }) {
  return (
    <LoginScreen
      username={auth.username}
      password={auth.password}
      onUsernameChange={auth.setUsername}
      onPasswordChange={auth.setPassword}
      onSubmit={auth.handleLogin}
      message={auth.message}
    />
  );
}
