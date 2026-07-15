import { api } from './api';

export async function getSummary(username) {
  const query = username ? `?username=${encodeURIComponent(username)}` : '';

  return await api.request(`/summary${query}`);
}
