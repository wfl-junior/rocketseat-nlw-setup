import { MotionConfig } from "framer-motion";
import { Fragment, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClientProvider, QueryErrorResetBoundary } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { SummaryTable } from "./components/SummaryTable";
import { SummaryTableSkeleton } from "./components/SummaryTableSkeleton";
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

            <QueryErrorResetBoundary>
              {({ reset }) => (
                <ErrorBoundary
                  onReset={reset}
                  fallbackRender={({ resetErrorBoundary }) => (
                    <div className="flex flex-col gap-4 items-center">
                      <span className="text-red-500 text-lg font-medium">
                        Ocorreu um erro inesperado 😰
                      </span>

                      <Button
                        onClick={() => resetErrorBoundary()}
                        className="focus-visible:ring-offset-background"
                      >
                        Tentar novamente
                      </Button>
                    </div>
                  )}
                >
                  <Suspense fallback={<SummaryTableSkeleton />}>
                    <SummaryTable />
                  </Suspense>
                </ErrorBoundary>
              )}
            </QueryErrorResetBoundary>
          </div>
        </div>
      </QueryClientProvider>
    </MotionConfig>
  </Fragment>
);
