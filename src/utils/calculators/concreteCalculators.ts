
import { Building, Landmark } from 'lucide-react';
import { Calculator } from '../calculatorTypes';

export const concreteCalculators: Calculator[] = [
  {
    id: 'concrete-volume',
    title: 'Concrete Volume Calculator',
    description: 'Calculate the precise amount of concrete needed for your foundation, slab, column, or custom-shaped projects.',
    icon: Building,
    category: 'Concrete',
    timeEstimate: '1 min'
  },
  {
    id: 'retaining-wall',
    title: 'Retaining Wall Calculator',
    description: 'Estimate materials needed for your retaining wall project, including blocks, backfill, and drainage components.',
    icon: Landmark,
    category: 'Concrete',
    timeEstimate: '2 min'
  }
];
