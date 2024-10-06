import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TransactionPage from "./pages/TransactionPage";
import TransactionForm from "./components/TransactionForm";
import Layout from "./components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
        path: "/transactions/new",
        element: <TransactionForm />,
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
