
import { LayoutGrid, Clock, Home } from 'lucide-react';
import { Calculator } from '../calculatorTypes';

export const specialtyCalculators: Calculator[] = [
  {
    id: 'parking-lot',
    title: 'Parking Lot Calculator',
    description: 'Plan your parking lot with precise measurements for asphalt quantity, striping, and drainage requirements.',
    icon: LayoutGrid,
    category: 'Specialty',
    timeEstimate: '3 min'
  },
  {
    id: 'project-timeline',
    title: 'Project Timeline Estimator',
    description: 'Estimate project duration based on scope, crew size, equipment availability, and weather conditions.',
    icon: Clock,
    category: 'Specialty',
    timeEstimate: '3 min'
  },
  {
    id: 'roofing-material',
    title: 'Roofing Material Calculator',
    description: 'Calculate the amount of shingles, underlayment, and accessories needed for your roofing project.',
    icon: Home,
    category: 'Specialty',
    timeEstimate: '2 min'
  }
];
