function AccountView({
  mode,
  user,
  profileForm,
  passwordForm,
  onProfileChange,
  onPasswordChange,
  onSaveProfile,
  onSavePassword,
  onCancel,
}) {
  return (
    <div className="auth" style={{ maxWidth: 640 }}>
      <div className="login-banner" style={{ textAlign: 'center' }}>
        <h2 style={{ margin: 0 }}>
          {mode === 'profile' ? 'Profile Settings' : 'Password Settings'}
        </h2>
      </div>
      {mode === 'profile' ? (
        <form onSubmit={onSaveProfile}>
          <div className="field">
            <label>Display Name</label>
            <input
              value={profileForm.full_name}
              onChange={(e) => onProfileChange(e.target.value)}
              placeholder={user.username}
            />
          </div>
          <div className="inline-actions">
            <button className="btn btn-primary" type="submit">
              Save Profile
            </button>
            <button className="btn btn-secondary" type="button" onClick={onCancel}>
              Back to Portal
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={onSavePassword}>
          <div className="field">
            <label>Current Password</label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => onPasswordChange('currentPassword', e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>New Password</label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => onPasswordChange('newPassword', e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => onPasswordChange('confirmPassword', e.target.value)}
              required
            />
          </div>
          <div className="inline-actions">
            <button className="btn btn-primary" type="submit">
              Update Password
            </button>
            <button className="btn btn-secondary" type="button" onClick={onCancel}>
              Back to Portal
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
