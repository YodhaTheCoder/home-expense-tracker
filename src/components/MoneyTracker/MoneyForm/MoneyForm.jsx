import '../MoneyTracker.css';


function MoneyForm({

  moneyForm,

  setMoneyForm,

  editingMoneyId,

  saveMoney,

  resetForm,

}) {


return (

<div className="card">

<h3 className="form-title">

{editingMoneyId ? 'Edit Money' : 'Add Money Given/Taken'}

</h3>



<form

className="expense-form"

onSubmit={(event)=>

saveMoney(

event,

moneyForm,

editingMoneyId

)

}

>


<div className="form-row">


<div className="field">

<label>

Type

</label>


<select

value={moneyForm.type}

onChange={(e)=>

setMoneyForm({

...moneyForm,

type:e.target.value

})

}

>


<option value="GIVEN">

Given

</option>


<option value="TAKEN">

Taken

</option>


</select>


</div>




<div className="field">

<label>

Amount

</label>


<input

type="number"

step="0.01"

value={moneyForm.amount}

onChange={(e)=>

setMoneyForm({

...moneyForm,

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

value={moneyForm.transaction_date}

onChange={(e)=>

setMoneyForm({

...moneyForm,

transaction_date:e.target.value

})

}

required

/>

</div>



</div>




<div className="field">

<label>

Person / Notes

</label>


<textarea

value={moneyForm.notes}

onChange={(e)=>

setMoneyForm({

...moneyForm,

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

{editingMoneyId ? 'Save Money' : 'Add Money'}

</button>



{editingMoneyId && (

<button

type="button"

className="btn btn-secondary"

onClick={resetForm}

>

Cancel

</button>

)}



</div>


</form>


</div>

);


}


export default MoneyForm;