
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Navbar from "./components/Navbar";
import AuthCallback from "./pages/AuthCallback";

const queryClient = new QueryClient();

// Protected route wrapper component
const ProtectedRoute: React.FC<{
  element: React.ReactNode;
}> = ({ element }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return user ? element : <Navigate to="/auth" replace />;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={user ? <Navigate to="/dashboard" replace /> : <Auth />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/calendar" element={<ProtectedRoute element={<Calendar />} />} />
        <Route path="/onboarding" element={<ProtectedRoute element={<div className="min-h-screen flex items-center justify-center">Onboarding Page (Coming Soon)</div>} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Navbar />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
