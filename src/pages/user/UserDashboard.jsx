import { useEffect, useState } from 'react';

import PortalShell from '../../components/PortalShell';

import AccountSettings from '../../components/AccountSettings';

import CategoryManager from '../../components/CategoryManager';

import StatsCard from '../../components/StatsCard';
import ExpenseForm from '../../components/ExpenseForm';
import ExpenseList from '../../components/ExpenseList';
import CategoryList from '../../components/CategoryList';

import { useExpenses } from '../../hooks/useExpenses';
import { useCategories } from '../../hooks/useCategories';
import { useSummary } from '../../hooks/useSummary';
import Stats from '../../components/Stats';

import { formatCurrency } from '../../utils/format';

export default function UserDashboard({ auth }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [entrySearch, setEntrySearch] = useState('');
  const [entryMonth, setEntryMonth] = useState('');
  const [entryCategory, setEntryCategory] = useState('');

  const [expenseForm, setExpenseForm] = useState({
    amount: '',
    category: 'Groceries',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [editingExpenseId, setEditingExpenseId] = useState(null);

  const [categoryForm, setCategoryForm] = useState({
    name: '',
  });
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const { expenses, saveExpense, deleteExpense, loadExpenses } = useExpenses(auth.user.username);

  const { categories, loadCategories, addCategory, saveCategory, removeCategory } = useCategories(
    auth.user.username
  );

  const { summary, loadSummary } = useSummary(auth.user.username);

  const { accountView } = auth;

  useEffect(() => {
    loadExpenses();
    loadCategories();
    loadSummary();
  }, []);

  if (accountView) {
    return <AccountSettings auth={auth} />;
  }

  function handleExpenseFieldChange(field, value) {
    setExpenseForm((prev) => ({
      ...prev,

      [field]: value,
    }));
  }

  const filteredExpenses = expenses.filter((expense) => {
    const search = entrySearch.toLowerCase();

    const matchesSearch =
      !search ||
      [expense.description, expense.category, expense.date].some((value) =>
        String(value).toLowerCase().includes(search)
      );

    const matchesMonth = !entryMonth || (expense.date || '').slice(0, 7) === entryMonth;

    const matchesCategory = !entryCategory || expense.category === entryCategory;

    return matchesSearch && matchesMonth && matchesCategory;
  });

  const monthOptions = Array.from(
    new Set(
      expenses

        .map((expense) => (expense.date || '').slice(0, 7))

        .filter(Boolean)
    )
  )

    .sort()

    .reverse();

  return (
    <PortalShell
      auth={auth}

      title="User Portal"

      subtitle="Track expenses, manage entries, and review your spending."

      navItems={[
        {
          id: 'dashboard',
          label: 'Dashboard',
        },

        {
          id: 'entries',
          label: 'Entries',
        },

        {
          id: 'categories',
          label: 'Categories',
        },
      ]}

      activeNav={activeTab}

      onNavigate={setActiveTab}
    >
      {activeTab === 'dashboard' && summary && (

  <Stats
    summary={summary}
    categories={categories}
  />

)}

      {activeTab === 'entries' && (
        <>
          <ExpenseForm
            expenseForm={expenseForm}

            setExpenseForm={setExpenseForm}

            editingExpenseId={editingExpenseId}

            setEditingExpenseId={setEditingExpenseId}

            categories={categories}

            addExpense={(event) => {
              saveExpense(
                event,

                expenseForm,

                null
              );
            }}

            saveExpense={(event) => {
              saveExpense(
                event,

                expenseForm,

                editingExpenseId
              );

              setEditingExpenseId(null);

              setExpenseForm({
                amount: '',

                category: categories[0]?.name || '',

                description: '',

                date: new Date().toISOString().split('T')[0],
              });
            }}
          />

          <ExpenseList
            expenses={filteredExpenses}

            onDelete={deleteExpense}

            onEdit={(expense) => {
              setEditingExpenseId(expense.id);

              setExpenseForm({
                amount: expense.amount,

                category: expense.category,

                description: expense.description,

                date: expense.date?.slice(0, 10) || '',
              });
            }}
          />
        </>
      )}

      {activeTab === 'categories' && (
        <CategoryManager
          categories={categories}

          user={auth.user}

          isAdmin={false}

          categoryForm={categoryForm}

          setCategoryForm={setCategoryForm}

          editingCategoryId={editingCategoryId}

          setEditingCategoryId={setEditingCategoryId}

          addCategory={addCategory}

          saveCategory={saveCategory}

          editCategory={saveCategory}

          removeCategory={removeCategory}
        />
      )}
    </PortalShell>
  );
}
