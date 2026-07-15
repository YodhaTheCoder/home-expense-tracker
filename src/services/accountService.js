import { request } from './api';

export function updateProfile(username, full_name) {
  return request(`/users/${username}/profile`, {
    method: 'PUT',
    body: JSON.stringify({
      full_name,
    }),
  });
}

export function changePassword(username, currentPassword, newPassword) {
  return request(`/users/${username}/password`, {
    method: 'PUT',
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
    }),
  });
}
