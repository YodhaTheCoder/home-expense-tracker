import { useState } from 'react';
import './ResetPassword.css';

function ResetPassword({ onReset, message }) {
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    await onReset(password);
  }

  return (
    <div className="auth">
      <div className="login-banner">
        <h2>Reset Password</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>New Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Confirm Password</label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary reset-submit" type="submit">
          Update Password
        </button>
      </form>

      {message && <p className="small reset-message">{message}</p>}
    </div>
  );
}

export default ResetPassword;
