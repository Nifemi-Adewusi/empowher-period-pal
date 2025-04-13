
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { toast } from "@/hooks/use-toast";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase configuration. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment variables.");
}

const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',  // Fallback to prevent client creation error
  supabaseAnonKey || 'placeholder_key'  // Fallback to prevent client creation error
);

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      if (!supabaseUrl || !supabaseAnonKey) {
        toast({
          title: "Configuration Error",
          description: "Supabase configuration is missing. Please check your environment variables.",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }
      
      try {
        const { data, error } = await supabase.auth.getUser();
        
        if (error) throw error;
        
        if (data?.user) {
          // Check if this is a new user that needs onboarding
          const { data: profile } = await supabase
            .from('profiles')
            .select('last_period')
            .eq('id', data.user.id)
            .single();
          
          toast({
            title: "Authentication Successful",
            description: "You have successfully logged in.",
          });
          
          if (profile && profile.last_period) {
            // Existing user with period data - send to dashboard
            navigate('/dashboard');
          } else {
            // New user or user without period data - send to onboarding
            navigate('/onboarding');
          }
        } else {
          navigate('/auth');
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        
        toast({
          title: "Authentication Error",
          description: error instanceof Error ? error.message : "Failed to complete authentication",
          variant: "destructive",
        });
        
        navigate('/auth');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-empowher-primary mx-auto"></div>
        <p className="mt-4 text-empowher-text">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
