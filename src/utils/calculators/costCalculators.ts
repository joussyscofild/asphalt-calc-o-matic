
import { TrendingUp, Percent } from 'lucide-react';
import { Calculator } from '../calculatorTypes';

export const costCalculators: Calculator[] = [
  {
    id: 'paving-cost',
    title: 'Paving Cost Calculator',
    description: 'Estimate the total cost of your paving project including materials, labor, equipment, and other expenses.',
    icon: TrendingUp,
    category: 'Cost Estimation',
    timeEstimate: '3 min',
    featured: true
  },
  {
    id: 'material-waste',
    title: 'Material Waste Calculator',
    description: 'Estimate material waste percentage and adjust your order quantities to account for cutting, spills, and damage.',
    icon: Percent,
    category: 'Cost Estimation',
    timeEstimate: '2 min'
  }
];
