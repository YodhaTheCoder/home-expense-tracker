import '../MoneyTracker.css';


function MoneyPaymentForm({

  paymentForm = {},

  setPaymentForm,

  selectedMoney,

  onSave,

  onCancel,

  editingPaymentId,

}) {


  function handleSubmit(e) {

    e.preventDefault();

    onSave({

      ...paymentForm,

      id: editingPaymentId,

    });

  }



  return (

    <div className="card">


      <h3 className="form-title">

        {editingPaymentId ? 'Edit Payment' : 'Add Payment'}

      </h3>



      {selectedMoney && (

        <div className="payment-info">

          <strong>
            {selectedMoney.person_name}
          </strong>

          <p>
            Original Amount: ₹{selectedMoney.amount}
          </p>

        </div>

      )}




      <form

        className="expense-form"

        onSubmit={handleSubmit}

      >



        <div className="form-row">



          <div className="field">


            <label>
              Amount
            </label>


            <input

              type="number"

              step="0.01"

              value={paymentForm.amount || ''}


              onChange={(e)=>

                setPaymentForm({

                  ...paymentForm,

                  amount:e.target.value

                })

              }


              required

            />


          </div>





          <div className="field">


            <label>
              Date
            </label>


            <input

              type="date"

              value={paymentForm.payment_date || ''}


              onChange={(e)=>

                setPaymentForm({

                  ...paymentForm,

                  payment_date:e.target.value

                })

              }


              required

            />


          </div>



        </div>







        <div className="field">


          <label>
            Notes
          </label>



          <textarea


            value={paymentForm.notes || ''}


            onChange={(e)=>

              setPaymentForm({

                ...paymentForm,

                notes:e.target.value

              })

            }


          />



        </div>







        <div className="inline-actions">



          <button

            className="btn btn-primary"

            type="submit"

          >

            {editingPaymentId ? 'Update Payment' : 'Save Payment'}


          </button>





          <button

            type="button"

            className="btn btn-secondary"

            onClick={onCancel}

          >

            Cancel


          </button>



        </div>




      </form>


    </div>


  );

}


export default MoneyPaymentForm;