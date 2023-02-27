import { Habit } from "./components/Habit";

interface AppProps {}

export const App: React.FC<AppProps> = () => (
  <div className="bg-zinc-900 flex flex-col min-h-screen text-zinc-100">
    <Habit completed={1} />
    <Habit completed={2} />
    <Habit completed={3} />
    <Habit completed={4} />
    <Habit completed={5} />
  </div>
);
