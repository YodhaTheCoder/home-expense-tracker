import { formatCurrency } from '../../../utils/format';
import '../MoneyTracker.css';


function MoneyPaymentList({

   payments = [],
  onEdit = () => {},
  onDelete = () => {},

}) {


  return (

    <div className="card expense-list-card">


      <div className="section-header">

        <h3>
          Payment History
        </h3>


        <span className="category-count">

          {payments.length} Payments

        </span>


      </div>





      {
        payments.length === 0 ? (

          <p className="muted">
            No payments found.
          </p>


        ) : (


          <div className="category-grid">


            {
              payments.map((payment)=>(


                <div

                  key={payment.id}

                  className="category-card user-card"

                >



                  <div className="category-top">


                    <div className="category-icon">

                      ₹

                    </div>



                    <div className="category-details">


                      <h4>

                        {formatCurrency(payment.amount)}

                      </h4>



                      <p className="username-text">

                        {new Date(
                          payment.payment_date
                        ).toLocaleDateString()}

                      </p>



                    </div>


                  </div>





                  {
                    payment.notes && (

                      <p className="expense-description">

                        {payment.notes}

                      </p>

                    )
                  }






                  <div className="category-actions">


                    <button

                      className="category-btn edit"

                      onClick={()=>{
                         console.log("Edit clicked", payment);
                        onEdit(payment)}
                      }

                    >

                      Edit

                    </button>




                    <button

                      className="category-btn delete"

                      onClick={()=>{
                         console.log("Delete clicked", payment.id);
                        onDelete(payment.id)}
                      }
                    >

                      Delete

                    </button>



                  </div>



                </div>


              ))
            }


          </div>


        )
      }



    </div>

  );

}


export default MoneyPaymentList;