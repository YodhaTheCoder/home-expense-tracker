import { api } from './api';

export function getExpenses(username) {
  return api.request(`/expenses?username=${encodeURIComponent(username)}`);
}

export function createExpense(payload) {
  return api.request('/expenses', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateExpense(id, username, payload) {
  return api.request(`/expenses/${id}?username=${encodeURIComponent(username)}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function removeExpense(id, username) {
  return api.request(`/expenses/${id}?username=${encodeURIComponent(username)}`, {
    method: 'DELETE',
  });
}
