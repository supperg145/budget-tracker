import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import TransactionPage from "./pages/TransactionPage";
import TransactionForm from "./components/TransactionForm";
import AddTransaction from "./pages/AddTransaction";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
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
        element: <AddTransaction />,
      },
      {
        path: "edit/:id",
        element: <TransactionForm />,
      },
      {
        path: "chart",
        element: <ChartPage />,
      },
      {
        path: "register",
        element: <RegisterPage />
      },
      {
        path: "login",
        element: <LoginPage />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
