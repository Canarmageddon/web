import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./style/bootstrapOverride.scss";
import "./style/index.css";
import "./style/list.css";
import "./style/admin.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-toastify/dist/ReactToastify.min.css";
import i18n from "./translation/i18n";
import RotatingDuck from "./components/loadingScreen/RotatingDuck";

const AppStart = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <React.StrictMode>
      <Suspense fallback={<RotatingDuck />}>
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
        <QueryClientProvider client={queryClient} contextSharing={true}>
          <App />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Suspense>
    </React.StrictMode>
  );
};

ReactDOM.render(<AppStart />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
