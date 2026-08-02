import { useState } from 'react';

import FinanceOverview from './Overview/FinanceOverview';
import Income from './Income/Income';
import Savings from './Savings/Savings';
import EMI from './EMI/EMI';
import Chits from './Chits/Chits';
import Insurance from './Insurance/Insurance';
import OneTimeExpenses from './OneTimeExpenses/OneTimeExpenses.jsx';

import './FinanceCommon.css';

export default function FinanceShell({ auth }) {
  const [activeFinanceTab, setActiveFinanceTab] = useState('overview');

  return (
    <div className="finance-container">
      <div className="finance-tabs-wrapper">
        <div className="finance-tabs">
          {[
            ['overview', 'Overview'],
            ['income', 'Income'],
            ['savings', 'Savings'],
            ['emi', 'EMI'],
            ['chits', 'Chits'],
            ['insurance', 'Insurance'],
            ['one-time', 'One-Time'],
          ].map(([id, label]) => (
            <button
              key={id}

              className={activeFinanceTab === id ? 'active' : ''}

              onClick={() => setActiveFinanceTab(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="finance-content">
        {activeFinanceTab === 'overview' && <FinanceOverview auth={auth} />}

        {activeFinanceTab === 'income' && <Income auth={auth} />}

        {activeFinanceTab === 'savings' && <Savings auth={auth} />}

        {activeFinanceTab === 'emi' && <EMI auth={auth} />}

        {activeFinanceTab === 'chits' && <Chits auth={auth} />}

        {activeFinanceTab === 'insurance' && <Insurance auth={auth} />}

        {activeFinanceTab === 'one-time' && <OneTimeExpenses auth={auth} />}
      </div>
    </div>
  );
}
