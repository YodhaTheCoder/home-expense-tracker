import { useState, useEffect } from 'react';

import {
  getMoneyDues,
  createMoneyDue,
  updateMoneyDue,
  removeMoneyDue,
  createMoneyPayment,
  updateMoneyPayment,
  removeMoneyPayment,
} from '../services/moneyTrackerService';



export function useMoneyTracker(
  userId = null,
  summaryFilter = {
    month: null,
    year: null,
  }
) {


  const [moneyDues, setMoneyDues] = useState([]);

  const [message, setMessage] = useState('');



  // Auto hide messages
  useEffect(() => {

    if (message) {

      const timer = setTimeout(() => {

        setMessage('');

      }, 3000);


      return () => clearTimeout(timer);

    }

  }, [message]);





  async function loadMoney() {

    try {

      const data = await getMoneyDues(userId);

      setMoneyDues(data);


    } catch (error) {

      setMessage(error.message);

    }

  }






  // ===========================
  // FILTER DATA
  // ===========================


  const filteredMoneyDues = moneyDues.filter(item => {


    // no filter selected
    if (
      !summaryFilter?.month &&
      !summaryFilter?.year
    ) {

      return true;

    }



    const date =
      new Date(item.transaction_date);



    const monthMatch =
      !summaryFilter.month ||
      date.getMonth() + 1 === summaryFilter.month;



    const yearMatch =
      !summaryFilter.year ||
      date.getFullYear() === summaryFilter.year;



    return monthMatch && yearMatch;


  });







  // ===========================
  // SAVE MONEY DUE
  // ===========================


  async function saveMoney(
    event,
    moneyForm,
    editingMoneyId
  ) {


    event.preventDefault();


    try {


      const payload = {

        type: moneyForm.type,

        person_name: moneyForm.person_name,

        amount: Number(moneyForm.amount),

        date: moneyForm.transaction_date,

        notes: moneyForm.notes,

        financial_year: getFinancialYear(),

      };




      if (editingMoneyId) {


        await updateMoneyDue(
          editingMoneyId,
          payload
        );


        setMessage(
          'Money updated.'
        );


      } else {


        await createMoneyDue(
          payload
        );


        setMessage(
          'Money added.'
        );


      }



      await loadMoney();



    } catch(error) {


      setMessage(
        error.message
      );


    }


  }







  // ===========================
  // DELETE MONEY DUE
  // ===========================


  async function deleteMoney(id) {


    try {


      await removeMoneyDue(id);


      setMessage(
        'Money deleted.'
      );


      await loadMoney();



    } catch(error) {


      setMessage(
        error.message
      );


    }


  }







  function getFinancialYear() {


    const today = new Date();

    const year = today.getFullYear();

    const month = today.getMonth()+1;



    if(month >= 4){

      return `${year}-${year+1}`;

    }


    return `${year-1}-${year}`;


  }








  // ===========================
  // SUMMARY CALCULATION
  // ===========================


  function calculateSummary(){


    let given = 0;

    let taken = 0;



    filteredMoneyDues.forEach(item => {


      const amount =
        Number(item.amount || 0);



      const paidAmount =
        (item.money_payments || [])
        .reduce(
          (sum,payment)=>
            sum + Number(payment.amount || 0),
          0
        );




      if(item.type === "GIVEN"){


        // money given
        given += amount;


        // money returned
        taken += paidAmount;


      }




      if(item.type === "TAKEN"){


        // money taken
        taken += amount;


        // money paid back
        given += paidAmount;


      }



    });





    return {

      given,

      taken,

      balance:
        given - taken

    };


  }





  const summary = calculateSummary();









  // ===========================
  // PAYMENT FUNCTIONS
  // ===========================



  async function savePayment(payload){


    try {


      await createMoneyPayment({

        due_id: payload.due_id,

        amount:Number(payload.amount),

        payment_date:
          payload.payment_date,

        notes:
          payload.notes || '',

      });



      setMessage(
        'Payment added.'
      );


      await loadMoney();



    } catch(error){


      setMessage(
        error.message
      );


    }


  }








  async function editPayment(
    id,
    payload
  ){


    try {


      await updateMoneyPayment(

        id,

        {

          amount:Number(payload.amount),

          payment_date:
            payload.payment_date,

          notes:
            payload.notes || '',

        }

      );



      setMessage(
        'Payment updated.'
      );



      await loadMoney();



    } catch(error){


      setMessage(
        error.message
      );


    }


  }








  async function deletePayment(id){


    try {


      await removeMoneyPayment(id);



      setMessage(
        'Payment deleted.'
      );



      await loadMoney();



    } catch(error){


      setMessage(
        error.message
      );


    }


  }









  return {


    // filtered list
    moneyDues:
      filteredMoneyDues,


    summary,


    message,


    loadMoney,


    saveMoney,


    deleteMoney,


    savePayment,


    editPayment,


    deletePayment,


  };


}