import "~/lib/dayjs";
import { Header } from "./components/Header";
import { SummaryTable } from "./components/SummaryTable";

interface AppProps {}

export const App: React.FC<AppProps> = () => (
  <div className="h-screen flex justify-center items-center">
    <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
      <Header />
      <SummaryTable />
    </div>
  </div>
);
