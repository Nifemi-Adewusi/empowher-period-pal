
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if we have the required Supabase config
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
          throw error;
        }
        
        if (data?.user) {
          // Check if this is a new user that needs onboarding
          const { data: profile } = await supabase
            .from('profiles')
            .select('last_period')
            .eq('id', data.user.id)
            .single();
          
          toast({
            title: "Success",
            description: "Successfully signed in!",
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
          title: "Error",
          description: "Authentication failed. Please try again.",
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
