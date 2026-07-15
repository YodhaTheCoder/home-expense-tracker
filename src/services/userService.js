import { api } from './api';

export function getUsers() {
  return api.request('/users');
}

export function createUser(payload) {
  return api.request('/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateUser(username, payload) {
  return api.request(`/users/${encodeURIComponent(username)}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteUser(username) {
  return api.request(`/users/${encodeURIComponent(username)}`, {
    method: 'DELETE',
  });
}
