
import { Calculator, CalculatorField, ExternalArticle } from '@/utils/calculatorTypes';
import { LucideIcon } from 'lucide-react';

// Extends the Calculator type but makes all fields optional for form state
export type FormData = Partial<Calculator>;

export interface CalculatorEditorProps {
  calculator?: Calculator;
  onSave: (calculator: Calculator) => void;
  onCancel: () => void;
}

// Re-export ExternalArticle for use in other components
export type { ExternalArticle };
