// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pnoecbhfwdwjqivpmufu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBub2VjYmhmd2R3anFpdnBtdWZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4Nzc1NzcsImV4cCI6MjA1NzQ1MzU3N30.4jfb3I27U_X56yE5H5nqcoGEmE9fOpApXG-aeqHAtwk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);