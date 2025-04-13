import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { toast } from "@/hooks/use-toast";

// Create Supabase client
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

type User = {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  lastPeriod?: Date;
  cycleLength?: number;
  periodLength?: number;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  googleAuth: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Set up auth state listener on mount
  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
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
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    setLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    // Create profile in the profiles table
    if (data.user) {
      await supabase.from('profiles').insert([
        {
          id: data.user.id,
          name: name,
          email: email,
        },
      ]);
    }
    
    setLoading(false);
  };

  const googleAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw new Error(error.message);
    }
    
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    setLoading(true);
    
    // Convert Date objects to ISO strings for storage
    const profileData = {
      ...data,
      last_period: data.lastPeriod ? data.lastPeriod.toISOString() : undefined,
      cycle_length: data.cycleLength,
      period_length: data.periodLength,
    };
    
    // Remove client-side only fields that don't match the database schema
    const { lastPeriod, cycleLength, periodLength, ...restData } = profileData;
    
    const { error } = await supabase
      .from('profiles')
      .update({
        ...restData,
        last_period: profileData.last_period,
        cycle_length: profileData.cycle_length,
        period_length: profileData.period_length,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);
    
    if (error) {
      throw new Error(error.message);
    }
    
    // Update local user state
    setUser({ ...user, ...data });
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, googleAuth, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
