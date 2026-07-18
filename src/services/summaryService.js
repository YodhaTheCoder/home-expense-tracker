import { api } from './api';

function getBudgetStatus(budget, expense) {
  if (!budget) {
    return {
      percentage: 0,
      status: 'none',
    };
  }

  const percentage = (expense / budget) * 100;

  let status = 'green';

  if (percentage > 100) {
    status = 'red';
  } else if (percentage >= 85) {
    status = 'yellow';
  }

  return {
    percentage: Number(percentage.toFixed(2)),

    status,
  };
}

export async function getSummary(userId = null, filters = {}) {
  /*
    1. Load expenses
  */
  const { year, month } = filters;

  let expenseQuery = api.from('expenses').select(`
      amount,
      category_id,
      user_id,
      expense_date,
      categories(
        name
      )
    `);

  if (userId) {
    expenseQuery = expenseQuery.eq('user_id', userId);
  }

  if (year && month) {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;

    const endDate = new Date(year, month, 0).toISOString().split('T')[0];

    expenseQuery = expenseQuery.gte('expense_date', startDate).lte('expense_date', endDate);
  }

  const { data: expenses, error: expenseError } = await expenseQuery;

  if (expenseError) {
    throw new Error(expenseError.message);
  }

  /*
    2. Load budgets
  */

  let budgetQuery = api.from('budgets').select(`
    id,
    year,
    month,
    amount,
    user_id
  `);

  if (year && month) {
    budgetQuery = budgetQuery.eq('year', year).eq('month', month);
  }

  const { data: budgets, error: budgetError } = await budgetQuery;

  if (budgetError) {
    throw new Error(budgetError.message);
  }

  //const budgetUserIds = budgets.filter((item) => item.user_id).map((item) => item.user_id);

  const userIds = [
    ...new Set([
      ...budgets.filter((b) => b.user_id).map((b) => b.user_id),
      ...expenses.filter((e) => e.user_id).map((e) => e.user_id),
    ]),
  ];

  let profiles = [];

  if (userIds.length > 0) {
    const { data, error } = await api
      .from('profiles')
      .select(
        `
    id,
    full_name,
    email
  `
      )
      .in('id', userIds);

    if (error) {
      throw new Error(error.message);
    }

    profiles = data;
  }

  /*
    Expense calculations
  */

  const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  const categorySummary = {};

  const userSummary = {};

  expenses.forEach((item) => {
    const amount = Number(item.amount);

    const category = item.categories?.name || 'Other';

    categorySummary[category] = (categorySummary[category] || 0) + amount;

    if (item.user_id) {
      userSummary[item.user_id] = (userSummary[item.user_id] || 0) + amount;
    }
  });

  /*
    Budget calculations
  */

  const globalBudget = budgets
    .filter((item) => item.user_id === null)
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const budgetStatus = getBudgetStatus(globalBudget, total);

  /*
    Assigned user budgets
  */

  const userBudgets = budgets
    .filter((item) => item.user_id !== null)
    .map((item) => {
      const expense = userSummary[item.user_id] || 0;

      const status = getBudgetStatus(Number(item.amount), expense);

      const profile = profiles.find((p) => p.id === item.user_id);

      return {
        user_id: item.user_id,

        name: profile?.full_name || profile?.email || 'User',

        budget: Number(item.amount),

        expense,

        remaining: Number(item.amount) - expense,

        percentage: status.percentage,

        status: status.status,
      };
    });

  return {
    total,

    count: expenses.length,

    byCategory: Object.entries(categorySummary).map(([name, amount]) => ({
      name,

      amount,
    })),

    byMonth: [],

    byUser: Object.entries(userSummary).map(([user_id, amount]) => {
      const profile = profiles.find((p) => p.id === user_id);

      return {
        user_id,
        full_name: profile?.full_name || profile?.email || 'Unknown',
        amount,
      };
    }),

    budget: {
      globalBudget,

      expense: total,

      remaining: globalBudget - total,

      percentage: budgetStatus.percentage,

      status: budgetStatus.status,
    },

    userBudgets,
  };
}
