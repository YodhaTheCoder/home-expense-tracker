import { formatCurrency } from '../../../utils/format';

import '../MoneyTracker.css';


function MoneyList({

moneyDues,

onEdit,

onDelete,
onPayment

}) {


return (

<div className="card expense-list-card">


<div className="section-header">

<h3>

Money Records

</h3>


<span className="category-count">

{moneyDues.length} Entries

</span>


</div>



{
moneyDues.length===0 ?

<p className="muted">

No money records found.

</p>


:

<div className="category-grid">


{
moneyDues.map((item)=>{


const paid = item.money_payments?.reduce(

(sum,p)=>sum+Number(p.amount),

0

) || 0;



// const remaining = Number(item.amount)-paid;



const paidAmount =
item.money_payments?.reduce(
(sum,p)=>sum + Number(p.amount),
0
) || 0;


const remaining =
Number(item.amount)-paidAmount;


return (
<div

key={item.id}

className="category-card user-card"

>



<div className="category-top">


<div className="category-icon">

₹

</div>



<div className="category-details">


<h4>

{formatCurrency(item.amount)}

</h4>



<p className="username-text">

{item.person_name}

</p>



<p className="username-text">

{item.type === 'GIVEN'
?
'Money Given'
:
'Money Taken'}

</p>



<div className="category-type custom-type">

{

new Date(item.transaction_date)

.toLocaleDateString()

}

</div>


</div>


</div>




<p className="expense-description">

Paid:

<strong>

&nbsp;
{formatCurrency(paidAmount)}

</strong>

</p>



<p className="expense-description">

Remaining:

<strong>

&nbsp;
{formatCurrency(remaining)}

</strong>

</p>

{
remaining===0 ?

<div className="category-type custom-type">

Completed

</div>

:

<div className="category-type custom-type">

Pending

</div>

}


<div className="category-actions">

<button

className="category-btn edit"

onClick={()=>onPayment(item)}

>

Add Payment

</button>

<button

className="category-btn edit"

onClick={()=>onEdit(item)}

>

Edit

</button>



<button

className="category-btn delete"

onClick={()=>onDelete(item.id)}

>

Delete

</button>


</div>



</div>


);


})

}


</div>

}


</div>

);


}


export default MoneyList;