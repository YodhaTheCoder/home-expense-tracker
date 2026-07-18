import { useState } from 'react';
import './ForgotPassword.css';

function ForgotPassword({ onSendReset, onBack, message }) {
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSendReset(email);
  }

  return (
    <div className="auth">
      <div className="login-banner">
        <h2>Forgot Password</h2>
        <p className="small">Enter your email to receive a password reset link.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <button
          className="btn btn-primary reset-btn"

          type="submit"
        >
          Send Reset Link
        </button>
      </form>

      <button
        type="button"
        className="btn-link back-link"

        onClick={onBack}
      >
        ← Back to Sign In
      </button>

      {message && (
        <p className="small" style={{ marginTop: 12 }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ForgotPassword;
