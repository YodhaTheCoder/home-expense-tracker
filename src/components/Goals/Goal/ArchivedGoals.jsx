import { useEffect } from 'react';
import { useGoals } from '../../../hooks/useGoals';
import ArchivedGoalCard from './ArchivedGoalCard';

export default function ArchivedGoals({ userId }) {
  const {
    archivedGoals,

    loadArchivedGoals,

    restoreGoal,

    removeGoal,
  } = useGoals(userId);

  useEffect(() => {
    loadArchivedGoals();
  }, []);

  if (archivedGoals.length === 0) {
    return <div className="empty-card">No archived goals.</div>;
  }

  return (
    <div>
      {archivedGoals.map((goal) => (
        <ArchivedGoalCard
          key={goal.id}

          goal={goal}

          restoreGoal={restoreGoal}

          removeGoal={removeGoal}
        />
      ))}
    </div>
  );
}
