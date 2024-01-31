import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import SmDashboard from "./pages/SmDashboard";
import Sell from "./pages/Sell";
import Store from "./pages/Store";
import Layout from "./components/layout";
import axios from "axios";
import User from "./pages/user";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Product from "./pages/product";
import Category from "./pages/category";
import Purchase from "./pages/purchase";
import Transfer from "./pages/transfer";

import { useSelector } from "react-redux";
import ViewCategory from "./pages/viewCategory";
import ViewProduct from "./pages/viewProduct";
import LandingLayout from "./components/LandingLayout";
import ViewStore from "./pages/viewStore.js";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;

function App() {
  const { currentUser } = useSelector((state) => state.auth);

  const ProtectedRouteAdmin = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />;
    else if (currentUser.role === "admin" || currentUser.role === "super")
      return children;
  };

  const ProtectedRouteSm = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />;
    else if (currentUser.role === "sm") return children;
  };
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />;
    return children;
  };
  return (
    <Routes>
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id" element={<ViewCategory />} />
        <Route path="/:id/:id" element={<ViewCategory />} />
        <Route path="/:id/:id/:id" element={<ViewProduct />} />
      </Route>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route
          path="dashboard"
          element={
            currentUser &&
            (currentUser.role === "admin" || currentUser.role === "super") ? (
              <AdminDashboard />
            ) : (
              <SmDashboard />
            )
          }
        />
        <Route
          path="user"
          element={
            <ProtectedRouteAdmin>
              <User />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="store"
          element={
            <ProtectedRouteAdmin>
              <Store />
            </ProtectedRouteAdmin>
          }
        />
        <Route path="store/:id" element={<ViewStore />} />
        <Route
          path="category"
          element={
            <ProtectedRouteAdmin>
              <Category />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="transfer"
          element={
            <ProtectedRouteAdmin>
              <Transfer />
            </ProtectedRouteAdmin>
          }
        />

        <Route path="product" element={<Product />} />
        <Route path="sell" element={<Sell />} />
        <Route path="purchase" element={<Purchase />} />
      </Route>
    </Routes>
  );
}

export default App;
