
import { useState } from 'react';
import { User } from '@/types/auth';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from "@/hooks/use-toast";

export const useAuthFunctions = (
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
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

  return {
    login,
    signup,
    googleAuth,
    logout,
    updateProfile
  };
};
