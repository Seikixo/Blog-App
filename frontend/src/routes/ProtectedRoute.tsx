import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import Header from '../components/Header';


export default function ProtectedRoute() {
  const { user, isLoading} = useAuth();


  if (isLoading) return <div><p>Loading...</p></div>
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}