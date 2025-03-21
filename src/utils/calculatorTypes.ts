
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
  featuredImage?: string;
  formula?: string;
  fields?: CalculatorField[];
  relatedCalculators?: string[];
  relatedArticles?: string[];
  externalArticles?: ExternalArticle[];
  tags?: string[];
}

export interface CalculatorField {
  id: string;
  label: string;
  type: 'number' | 'select' | 'radio' | 'checkbox';
  placeholder?: string;
  defaultValue?: string | number | boolean | Json;
  required?: boolean;
  options?: { value: string; label: string }[] | Json;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  helperText?: string;
}

export interface ExternalArticle {
  title: string;
  url: string;
  imageUrl?: string;
}
