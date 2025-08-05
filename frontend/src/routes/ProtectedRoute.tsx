import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from 'flowbite-react';


export default function ProtectedRoute() {
  const { user, isLoading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (isLoading) return <div><p>Loading...</p></div>
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar fluid className="bg-blue-600 text-white">
        <Link
          to="/home"
          className="text-white text-xl font-semibold px-4 py-2 flex items-center"
        >
          My App
        </Link>
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink 
            href="/home" 
            active={location.pathname === '/home'}
            className="text-white"
            onClick={(e) => {
              e.preventDefault();
              navigate('/home');
            }}
          >
            Home
          </NavbarLink>

          <NavbarLink 
            href="/blog" 
            active={location.pathname === '/blog'}
            className="text-white"
            onClick={(e) => {
              e.preventDefault();
              navigate('/blog');
            }}
          >
            Blog
          </NavbarLink>
          <NavbarLink 
            className="text-white cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            Logout
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}