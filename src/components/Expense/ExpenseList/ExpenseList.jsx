import { useState } from "react";
import { formatCurrency } from "../../../utils/format";
import "./ExpenseList.css";

function ExpenseList({ expenses, onEdit, onDelete }) {

  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [yearFilter, setYearFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");



  const categories = [
    ...new Set(expenses.map((e) => e.category))
  ];


  const users = [
    ...new Set(expenses.map((e) => e.full_name))
  ];



  // Auto generate years from 2020 to current year
  const years = Array.from(
    {
      length: new Date().getFullYear() - 2020 + 1
    },
    (_, index) => 2020 + index
  );



  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ];




  const filteredExpenses = expenses.filter((expense) => {

    const date = new Date(expense.date);

    const expenseYear = date.getFullYear();

    const expenseMonth = String(
      date.getMonth() + 1
    ).padStart(2, "0");



    return (

      (!categoryFilter ||
        expense.category === categoryFilter)

      &&

      (!userFilter ||
        expense.full_name === userFilter)

      &&

      (!dateFilter ||
        expense.date.substring(0,10) === dateFilter)

      &&

      (!yearFilter ||
        expenseYear === Number(yearFilter))

      &&

      (!monthFilter ||
        expenseMonth === monthFilter)

    );

  });





  const clearFilters = () => {

    setCategoryFilter("");
    setUserFilter("");
    setDateFilter("");
    setYearFilter("");
    setMonthFilter("");

  };





  return (

    <div className="card expense-list-card">


      <div className="section-header">

        <h3>
          Recent Entries
        </h3>


        <div className="header-right">

          <span className="category-count">
            {filteredExpenses.length} Entries
          </span>


          <button
            className="filter-button"
            onClick={() =>
              setShowFilterPanel(true)
            }
          >
            ☰ Filter
          </button>


        </div>


      </div>





      {showFilterPanel && (

        <>

          <div
            className="filter-overlay"
            onClick={() =>
              setShowFilterPanel(false)
            }
          />



          <div className="filter-drawer">


            <div className="filter-title">

              <h2>
                Filters
              </h2>


              <button
                onClick={() =>
                  setShowFilterPanel(false)
                }
              >
                ✕
              </button>


            </div>





            <div className="filter-section">

              <h4>
                Category
              </h4>


              <select
                value={categoryFilter}
                onChange={(e)=>
                  setCategoryFilter(e.target.value)
                }
              >

                <option value="">
                  All Categories
                </option>


                {categories.map((item)=>(

                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>

                ))}


              </select>


            </div>






            <div className="filter-section">

              <h4>
                User
              </h4>


              <select
                value={userFilter}
                onChange={(e)=>
                  setUserFilter(e.target.value)
                }
              >

                <option value="">
                  All Users
                </option>


                {users.map((item)=>(

                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>

                ))}


              </select>


            </div>






            <div className="filter-section">

              <h4>
                Date
              </h4>


              <input
                type="date"
                value={dateFilter}
                onChange={(e)=>
                  setDateFilter(e.target.value)
                }
              />

            </div>






            <div className="filter-section">

              <h4>
                Year
              </h4>


              <select
                value={yearFilter}
                onChange={(e)=>
                  setYearFilter(e.target.value)
                }
              >

                <option value="">
                  All Years
                </option>


                {years.map((year)=>(

                  <option
                    key={year}
                    value={year}
                  >
                    {year}
                  </option>

                ))}


              </select>


            </div>






            <div className="filter-section">

              <h4>
                Month
              </h4>


              <select
                value={monthFilter}
                onChange={(e)=>
                  setMonthFilter(e.target.value)
                }
              >

                <option value="">
                  All Months
                </option>


                {months.map((month)=>(

                  <option
                    key={month.value}
                    value={month.value}
                  >
                    {month.label}
                  </option>

                ))}


              </select>


            </div>






            <div className="filter-actions">


              <button
                className="clear-button"
                onClick={clearFilters}
              >
                Clear
              </button>



              <button
                className="apply-button"
                onClick={() =>
                  setShowFilterPanel(false)
                }
              >
                Apply
              </button>


            </div>


          </div>


        </>

      )}






      {filteredExpenses.length === 0 ? (

        <p className="muted">
          No expenses found.
        </p>

      ) : (


        <div className="category-grid">

          {filteredExpenses.map((expense)=>(

            <div
              key={expense.id}
              className="category-card user-card"
            >

              <div className="category-top">


                <div className="category-icon">
                  ₹
                </div>


                <div className="category-details">

                  <h4>
                    {formatCurrency(expense.amount)}
                  </h4>


                  <p className="username-text">
                    {expense.category}
                  </p>


                  <p className="username-text">
                    {expense.full_name || "Unknown"}
                  </p>


                  <div className="category-type custom-type">

                    {new Date(
                      expense.date
                    ).toLocaleDateString()}

                  </div>


                </div>


              </div>


              <p className="expense-description">
                {expense.description}
              </p>



              <div className="category-actions">

                <button
                  className="category-btn edit"
                  onClick={() =>
                    onEdit(expense)
                  }
                >
                  Edit
                </button>


                <button
                  className="category-btn delete"
                  onClick={() =>
                    onDelete(expense.id)
                  }
                >
                  Delete
                </button>


              </div>


            </div>


          ))}

        </div>


      )}


    </div>

  );

}


export default ExpenseList;