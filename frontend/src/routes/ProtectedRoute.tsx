// src/routes/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { JSX } from 'react';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div><p>Loading...</p></div>
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
