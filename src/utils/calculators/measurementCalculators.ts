
import { Scale, CornerUpRight } from 'lucide-react';
import { Calculator } from '../calculatorTypes';

export const measurementCalculators: Calculator[] = [
  {
    id: 'material-conversion',
    title: 'Material Conversion Calculator',
    description: 'Convert between different units and measurements for construction materials including weight, volume, and area.',
    icon: Scale,
    category: 'Measurement',
    timeEstimate: '1 min'
  },
  {
    id: 'slope-grade',
    title: 'Slope & Grade Calculator',
    description: 'Calculate slope percentage, angle, and ratio for drainage systems, ramps, and road design.',
    icon: CornerUpRight,
    category: 'Measurement',
    timeEstimate: '1 min'
  }
];
