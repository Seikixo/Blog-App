import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../hooks/useAuth';
import Home from '../pages/Home';
import MyPosts from '../pages/MyPosts';
import Register from '../pages/Register';

function DefaultRedirect() {
  const { user } = useAuth();
  return <Navigate to={user ? "/home" : "/login"} replace />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultRedirect />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/myposts" element={<MyPosts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
