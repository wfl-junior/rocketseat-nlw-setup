import { MotionConfig } from "framer-motion";
import { Fragment } from "react";
import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Header } from "./components/Header";
import { SummaryTable } from "./components/SummaryTable";
import { queryClient } from "./lib/react-query";

interface AppProps {}

export const App: React.FC<AppProps> = () => (
  <Fragment>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />

    <MotionConfig reducedMotion="user">
      <QueryClientProvider client={queryClient}>
        <div className="h-screen flex justify-center items-center">
          <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
            <Header />
            <SummaryTable />
          </div>
        </div>
      </QueryClientProvider>
    </MotionConfig>
  </Fragment>
);
