export default function ArchivedGoalCard({
  goal,

  restoreGoal,

  removeGoal,
}) {
  return (
    <div className="goal-card">
      <h3>{goal.title}</h3>

      <p>Target ₹{goal.target_amount}</p>

      <p>Saved ₹{goal.saved_amount}</p>

      <p>Completed</p>

      <div className="goal-actions">
        <button onClick={() => restoreGoal(goal.id)}>Restore</button>

        <button onClick={() => removeGoal(goal.id)}>Delete</button>
      </div>
    </div>
  );
}
