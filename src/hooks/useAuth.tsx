import { useState, useEffect } from 'react';
import { createSupabaseClient } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

const supabase = createSupabaseClient();

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return {
    session,
    loading,
    signUp: (args: any) => supabase.auth.signUp(args),
    signIn: (args: any) => supabase.auth.signInWithPassword(args),
    signInWithGoogle: () => supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    }),
    signOut: () => supabase.auth.signOut(),
  };
}; 