function LoginScreen({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  message,
}) {
  return (
    <div className="auth">
      <div className="login-banner" style={{ textAlign: 'center' }}>
        <h2 style={{ margin: 0 }}>Expense Tracker</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div className="field">
          <label>Username</label>
          <input value={username} onChange={(e) => onUsernameChange(e.target.value)} required />
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
        <button className="btn btn-primary" style={{ width: '100%' }} type="submit">
          Sign in
        </button>
      </form>
      {message ? (
        <p className="small" style={{ marginTop: 12 }}>
          {message}
        </p>
      ) : null}
    </div>
  );
}

export default LoginScreen;
