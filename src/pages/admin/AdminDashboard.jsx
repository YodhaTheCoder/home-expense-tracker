import { useEffect, useState } from 'react';

import './AdminDashboard.css';

import PortalShell from '../../components/PortalShell/PortalShell.jsx';
import AccountSettings from '../../components/AccountSettings/AccountSettings.jsx';
import Stats from '../../components/Stats/Stats.jsx';
import CategoryManager from '../../components/CategoryManager/CategoryManager.jsx';
import UserManagement from '../../components/admin/UserManagement/UserManagement.jsx';
import ExpenseForm from '../../components/Expense/ExpenseForm/ExpenseForm.jsx';
import ExpenseList from '../../components/Expense/ExpenseList/ExpenseList.jsx';

import { useExpenses } from '../../hooks/useExpenses';
import { useCategories } from '../../hooks/useCategories';
import { useSummary } from '../../hooks/useSummary';

import BudgetManagement from '../../components/admin/BudgetManagement/BudgetManagement.jsx';
import { useBudget } from '../../hooks/useBudget';
import BudgetSummary from '../../components/BudgetSummary/BudgetSummary.jsx';

import MoneyTracker from '../../components/MoneyTracker/MoneyTracker.jsx';
import { useMoneyTracker } from '../../hooks/useMoneyTracker';

function AdminDashboard({ auth }) {
  const {
    user,
    users,
    categories,

    activeAdminTab,
    setActiveAdminTab,

    accountView,

    categoryForm,
    setCategoryForm,

    editingCategoryId,
    setEditingCategoryId,

    addCategory,
    saveCategory,
    editCategory,
    removeCategory,
  } = auth;

  const getDefaultCategoryId = () => {
    return categories.find((category) => category.name === 'Groceries')?.id || '';
  };

  const [expenseForm, setExpenseForm] = useState({
    amount: '',

    category_id: '',

    description: '',

    date: new Date().toISOString().split('T')[0],
  });

  const [editingExpenseId, setEditingExpenseId] = useState(null);

  const isSuperAdmin = auth.profile?.role === 'super_admin';

  const { expenses, saveExpense, deleteExpense, loadExpenses } = useExpenses();

  const { summary, loadSummary } = useSummary();

const today = new Date();

const [summaryFilter, setSummaryFilter] = useState({
  year: null,
  month: null,
});


const money = useMoneyTracker(
  null,
  summaryFilter
);


  const budget = useBudget(auth.profile);

  const today = new Date();

  const [summaryFilter, setSummaryFilter] = useState({
    year: today.getFullYear(),

    month: today.getMonth() + 1,
  });

  const { loadCategories } = useCategories();

  useEffect(() => {
    loadCategories();
    loadExpenses();
    money.loadMoney();
  }, []);

  useEffect(() => {
    loadSummary(summaryFilter);
  }, [summaryFilter.year, summaryFilter.month]);

  useEffect(() => {
    const groceries = categories.find((category) => category.name === 'Groceries');

    if (groceries && !expenseForm.category_id) {
      setExpenseForm((prev) => ({
        ...prev,

        category_id: groceries.id,
      }));
    }
  }, [categories]);

  if (accountView) {
    return <AccountSettings auth={auth} />;
  }

  return (
    <PortalShell
      auth={auth}

      navItems={[
        {
          id: 'dashboard',
          label: 'Dashboard',
        },

        {
          id: 'entries',
          label: 'Expenses',
        },

        {
 id:'money',
 label:'Money Given/Taken'
},

        {
          id: 'categories',
          label: 'Categories',
        },

        ...(isSuperAdmin
          ? [
              {
                id: 'users',
                label: 'Users',
              },

              {
                id: 'budget',
                label: 'Budget',
              },
            ]
          : []),
      ]}

      activeNav={activeAdminTab}

      onNavigate={setActiveAdminTab}
    >
      {activeAdminTab === 'dashboard' && (
        <>
          {summary?.budget && (
            <BudgetSummary
              title="Monthly Budget Planner"

              budget={summary.budget.globalBudget}

              expense={summary.budget.expense}

              remaining={summary.budget.remaining}

              percentage={summary.budget.percentage}

              status={summary.budget.status}

              summaryFilter={summaryFilter}

              setSummaryFilter={setSummaryFilter}
            />
          )}

          <Stats
            summary={summary}

            users={users}

            categories={categories}

            showUsers={true}

            showUserTotals={true}
          />
        </>
      )}

      {summary?.userBudgets?.length > 0 && (
        <div className="card">
          <h3>Assigned User Budgets</h3>

          {summary.userBudgets.map((item) => (
            <BudgetSummary
              key={item.user_id}

              title={item.name}

              budget={item.budget}

              expense={item.expense}

              remaining={item.remaining}

              percentage={item.percentage}

              status={item.status}
            />
          ))}
        </div>
      )}

      {activeAdminTab === 'entries' && (
        <>
          <ExpenseForm
            expenseForm={expenseForm}

            setExpenseForm={setExpenseForm}

            editingExpenseId={editingExpenseId}

            setEditingExpenseId={setEditingExpenseId}

            categories={categories}

            addExpense={async (event) => {
              await saveExpense(
                event,

                expenseForm,

                null
              );

              await loadExpenses();

              await loadSummary(summaryFilter);

              setExpenseForm({
                amount: '',

                category_id: getDefaultCategoryId(),

                description: '',

                date: new Date().toISOString().split('T')[0],
              });
            }}

            saveExpense={async (event) => {
              await saveExpense(
                event,

                expenseForm,

                editingExpenseId
              );

              await loadExpenses();

              await loadSummary(summaryFilter);

              setEditingExpenseId(null);

              setExpenseForm({
                amount: '',

                category_id: getDefaultCategoryId(),

                description: '',

                date: new Date().toISOString().split('T')[0],
              });
            }}
          />

          <ExpenseList
            expenses={expenses}

            onDelete={async (id) => {
              await deleteExpense(id);

              await loadExpenses();

              await loadSummary(summaryFilter);
            }}

            onEdit={(expense) => {
              setEditingExpenseId(expense.id);

              setExpenseForm({
                amount: expense.amount,

                category_id: expense.category_id,

                description: expense.description,

                date: expense.date?.slice(0, 10) || '',
              });
            }}
          />
        </>
      )}

{activeAdminTab === 'money' && (

    <MoneyTracker

        moneyDues={money.moneyDues}

        summary={money.summary}

        loadMoney={money.loadMoney}

        saveMoney={money.saveMoney}

        deleteMoney={money.deleteMoney}

        savePayment={money.savePayment}
         editPayment={money.editPayment}
    deletePayment={money.deletePayment}
        message={money.message}
 summaryFilter={summaryFilter}

    setSummaryFilter={setSummaryFilter}
    />

)}

      {activeAdminTab === 'categories' && (
        <CategoryManager
          categories={categories}

          user={user}

          isAdmin={true}

          categoryForm={categoryForm}

          setCategoryForm={setCategoryForm}

          editingCategoryId={editingCategoryId}

          setEditingCategoryId={setEditingCategoryId}

          addCategory={(name) => {
            addCategory(
              {
                preventDefault: () => {},
              },

              name
            );
          }}

          saveCategory={(id, name) => {
            saveCategory(
              {
                preventDefault: () => {},
              },

              id,

              name
            );
          }}

          editCategory={editCategory}

          removeCategory={removeCategory}
        />
      )}

      {isSuperAdmin && activeAdminTab === 'users' && <UserManagement {...auth} />}

      {isSuperAdmin && activeAdminTab === 'budget' && (
        <BudgetManagement
          budgets={budget.budgets}

          users={budget.users}

          createBudget={budget.createBudget}

          updateBudget={budget.updateBudget}

          deleteBudget={budget.deleteBudget}

          message={budget.message}

          messageType={budget.messageType}
        />
      )}
    </PortalShell>
  );
}

export default AdminDashboard;
