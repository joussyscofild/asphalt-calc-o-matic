
import { LucideIcon } from 'lucide-react';
import { Json } from '@/integrations/supabase/types';

export interface Calculator {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  icon: LucideIcon;
  category: string;
  subCategory?: string;
  timeEstimate: string;
  featured?: boolean;
  formula?: string;
  fields?: CalculatorField[];
  relatedCalculators?: string[];
  relatedArticles?: string[];
}

export interface CalculatorField {
  id: string;
  label: string;
  type: 'number' | 'select' | 'radio' | 'checkbox';
  placeholder?: string;
  defaultValue?: string | number | Json;
  required?: boolean;
  options?: { value: string; label: string }[];
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  helperText?: string;
}
