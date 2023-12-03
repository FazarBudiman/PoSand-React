import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Pesanan from "../pages/Pesanan";
import Pelanggan from "../pages/Pelanggan";
import Karyawan from "../pages/Karyawan";
import Cookies from "js-cookie";

const Router = () => {
  const ProtectedRoute = ({ element, ...rest }) => {
    const isAuthenticated = Cookies.get("access-token");

    return isAuthenticated !== "" ? element : <Navigate to="/" replace state={{ from: rest.location }} />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/pesanan" element={<ProtectedRoute element={<Pesanan />} />} />
        <Route path="/pelanggan" element={<ProtectedRoute element={<Pelanggan />} />} />
        <Route path="/karyawan" element={<ProtectedRoute element={<Karyawan />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
