import './LoginScreen.css';

function LoginScreen({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onForgotPassword,
  message,
}) {
  return (
    <div className="auth">
      <div className="login-banner">
        <h2>Expense Tracker</h2>
      </div>

      <form onSubmit={onSubmit}>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
          />
        </div>

        <div className="forgot-password-action">
          <button type="button" className="btn-link" onClick={onForgotPassword}>
            Forgot Password?
          </button>
        </div>

        <button className="btn btn-primary login-submit" type="submit">
          Sign in
        </button>
      </form>

      {message && <p className="small login-message">{message}</p>}
    </div>
  );
}

export default LoginScreen;
