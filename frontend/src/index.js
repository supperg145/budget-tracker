import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import TransactionPage from "./pages/TransactionPage";
import TransactionForm from "./components/TransactionForm";
import Layout from "./components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ChartPage from "./pages/ChartPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/transactions",
        element: <TransactionPage />,
      },
      {
        path: "add",
        element: <TransactionForm />,
      },
      {
        path: "edit/:id",
        element: <TransactionForm />,
      },
      {
        path: "chart",
        element: <ChartPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
