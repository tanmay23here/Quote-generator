import { Quote } from '../types/types';
import { createClient } from '@supabase/supabase-js'


const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)


export const fetchQuoteByMood = async (moodId: string): Promise<Quote> => {
  try {
    

    const { data, error } = await supabase.functions.invoke('quote-generator', {
      body: { moodId },
    })

    if (error) {
      throw new Error(error.error || 'Failed to fetch quote');
    }

    
    return data;
  } catch (error: any) {
    console.error('Error fetching quote:', error);
    throw error;
  }
};
