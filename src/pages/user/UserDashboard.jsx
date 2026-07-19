import { useEffect, useState } from 'react';

import PortalShell from '../../components/PortalShell/PortalShell.jsx';

import AccountSettings from '../../components/AccountSettings/AccountSettings.jsx';

import CategoryManager from '../../components/CategoryManager/CategoryManager.jsx';

import Stats from '../../components/Stats/Stats.jsx';

import ExpenseForm from '../../components/Expense/ExpenseForm/ExpenseForm.jsx';
import ExpenseList from '../../components/Expense/ExpenseList/ExpenseList.jsx';

import { useExpenses } from '../../hooks/useExpenses';
import { useCategories } from '../../hooks/useCategories';
import { useSummary } from '../../hooks/useSummary';


export default function UserDashboard({ auth }) {

  const [activeTab, setActiveTab] = useState('dashboard');


  const [entrySearch, setEntrySearch] = useState('');
  const [entryMonth, setEntryMonth] = useState('');
  const [entryCategory, setEntryCategory] = useState('');



  const [expenseForm, setExpenseForm] = useState({

    amount: '',

    category_id: '',

    description: '',

    date: new Date().toISOString().split('T')[0],

  });



  const getDefaultCategoryId = () => {

    return (
      categories.find(
        (category) =>
          category.name === 'Groceries'
      )?.id || ''
    );

  };



  const [editingExpenseId, setEditingExpenseId] =
    useState(null);



  const [categoryForm, setCategoryForm] =
    useState({
      name: '',
    });



  const [editingCategoryId, setEditingCategoryId] =
    useState(null);



  const {
    expenses,
    saveExpense,
    deleteExpense,
    loadExpenses,

  } = useExpenses(auth.user.id);



  const {
    categories,
    loadCategories,
    addCategory,
    saveCategory,
    removeCategory,

  } = useCategories();



  const {
    summary,
    loadSummary,

  } = useSummary(auth.user.id);



  const { accountView } = auth;



  useEffect(() => {

    loadExpenses();

    loadCategories();

    loadSummary();

  }, []);



  /*
    Set Groceries as default after categories load
  */
  useEffect(() => {


    const groceries = categories.find(

      (category) =>
        category.name === 'Groceries'

    );


    if (
      groceries &&
      !expenseForm.category_id
    ) {

      setExpenseForm((prev) => ({

        ...prev,

        category_id: groceries.id,

      }));

    }


  }, [categories]);



  if (accountView) {

    return (
      <AccountSettings auth={auth} />
    );

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
      [
        expense.description,
        expense.category,
        expense.date,

      ].some((value) =>
        String(value)
          .toLowerCase()
          .includes(search)
      );



    const matchesMonth =
      !entryMonth ||
      (expense.date || '').slice(0, 7) === entryMonth;



    const matchesCategory =
      !entryCategory ||
      expense.category === entryCategory;



    return (
      matchesSearch &&
      matchesMonth &&
      matchesCategory
    );

  });



  const monthOptions = Array.from(

    new Set(

      expenses

        .map(
          (expense) =>
            (expense.date || '').slice(0, 7)
        )

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







            addExpense={async (event) => {



              await saveExpense(

                event,

                expenseForm,

                null

              );



              await loadSummary();





              setExpenseForm({

                amount: '',


                category_id:
                  getDefaultCategoryId(),


                description: '',


                date:
                  new Date()
                    .toISOString()
                    .split('T')[0],


              });



            }}








            saveExpense={async (event) => {



              await saveExpense(

                event,

                expenseForm,

                editingExpenseId

              );



              await loadSummary();




              setEditingExpenseId(null);




              setExpenseForm({

                amount: '',


                category_id:
                  getDefaultCategoryId(),


                description: '',


                date:
                  new Date()
                    .toISOString()
                    .split('T')[0],


              });



            }}



          />





          <ExpenseList



            expenses={filteredExpenses}





            onDelete={async (id) => {



              await deleteExpense(id);



              await loadSummary();



            }}






            onEdit={(expense) => {



              setEditingExpenseId(
                expense.id
              );



              setExpenseForm({

                amount:
                  expense.amount,



                category_id:
                  expense.category_id,



                description:
                  expense.description,



                date:
                  expense.date?.slice(0, 10)
                  || '',


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