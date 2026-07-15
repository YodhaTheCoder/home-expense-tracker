import { api } from './api';

export async function login(username, password) {
  return await api.request('/login', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
  });
}
