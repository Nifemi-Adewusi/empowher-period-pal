
import { useEffect } from 'react';
import { User } from '@/types/auth';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from "@/hooks/use-toast";

export const useAuthStateListener = (
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      toast({
        title: "Configuration Error",
        description: "Supabase configuration is missing. Please check your environment variables.",
        variant: "destructive",
      });
      return;
    }
    
    // Check active session
    const checkSession = async () => {
      setLoading(true);
      
      // Get user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Fetch user profile data from profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setUser({
          id: session.user.id,
          name: profile?.name || session.user.user_metadata?.full_name || 'User',
          email: session.user.email || '',
          photoURL: profile?.photo_url || session.user.user_metadata?.avatar_url,
          lastPeriod: profile?.last_period ? new Date(profile.last_period) : undefined,
          cycleLength: profile?.cycle_length || 28,
          periodLength: profile?.period_length || 5,
        });
      }
      
      setLoading(false);
    };
    
    checkSession();
    
    // Set up auth state subscriber
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Fetch user profile data from profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setUser({
            id: session.user.id,
            name: profile.name || session.user.user_metadata?.full_name || 'User',
            email: session.user.email || '',
            photoURL: profile.photo_url || session.user.user_metadata?.avatar_url,
            lastPeriod: profile.last_period ? new Date(profile.last_period) : undefined,
            cycleLength: profile.cycle_length || 28,
            periodLength: profile.period_length || 5,
          });
        } else {
          // Create a profile if it doesn't exist
          const newProfile = {
            id: session.user.id,
            name: session.user.user_metadata?.full_name || 'User',
            email: session.user.email,
            photo_url: session.user.user_metadata?.avatar_url,
          };
          
          await supabase.from('profiles').insert([newProfile]);
          
          setUser({
            id: session.user.id,
            name: newProfile.name,
            email: newProfile.email || '',
            photoURL: newProfile.photo_url,
          });
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setLoading]);
};
