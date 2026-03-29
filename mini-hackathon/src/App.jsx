import { Routes, Route } from "react-router-dom";

// USER
import ProductList from "./pages/user/ProductList";
import Order from "./pages/user/OrderForm";
import Review from "./pages/user/Review";

// ADMIN
import AdminDashboard from "./pages/admin/Dashboard";
import BranchManagement from "./pages/admin/BranchManagement";

// BRANCH
import BranchDashboard from "./pages/branch/Dashboard";
import ProtectedRoute from "./ProtecteRoutes/ProtectedRoute";
import Auth_Route from "./ProtecteRoutes/Auth_Route";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Auth_Route_2 from "./ProtecteRoutes/Auth_Route_2";
import BasicDashboard from "./components/Basic/BasicDashboard";

export default function App() {
  return (
    <Routes>
      <Route element={<Auth_Route />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>
      <Route element={<Auth_Route_2 />}>
        <Route element={<BasicDashboard />}>
          {/* USER */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order:id"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route
            path="/review"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Review />
              </ProtectedRoute>
            }
          />

          {/* ADMIN */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* BRANCH */}
          <Route
            path="/branch/dashboard"
            element={
              <ProtectedRoute allowedRoles={["branch"]}>
                <BranchDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}
