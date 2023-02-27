interface HabitProps {
  completed: number;
}

export const Habit: React.FC<HabitProps> = ({ completed }) => (
  <p>Habit {completed}</p>
);
