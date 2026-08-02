import { useState } from 'react';

import GoalList from './GoalList.jsx';
import Wishlist from '../Wishlist/Wishlist.jsx';
import ArchivedGoals from './ArchivedGoals';

import './Goals.css';

export default function Goals({ auth }) {
  const [activeTab, setActiveTab] = useState('goals');

  return (
    <div className="goals-container">
      <div className="goals-header">
        <h2>Goals</h2>
      </div>

      <div className="goals-tabs">
        <button
          className={activeTab === 'goals' ? 'active' : ''}

          onClick={() => setActiveTab('goals')}
        >
          Goals
        </button>

        <button
          className={activeTab === 'wishlist' ? 'active' : ''}

          onClick={() => setActiveTab('wishlist')}
        >
          Wishlist
        </button>

        <button
          className={activeTab === 'archived' ? 'active' : ''}
          onClick={() => setActiveTab('archived')}
        >
          Archived
        </button>
      </div>

      <div className="goals-content">
        {activeTab === 'goals' ? (
          <GoalList userId={auth.user.id} />
        ) : activeTab === 'wishlist' ? (
          <Wishlist userId={auth.user.id} />
        ) : (
          <ArchivedGoals userId={auth.user.id} />
        )}
      </div>
    </div>
  );
}
