
import { Truck } from 'lucide-react';
import { Calculator } from '../calculatorTypes';

export const earthworkCalculators: Calculator[] = [
  {
    id: 'earthwork-excavation',
    title: 'Earthwork Excavation Calculator',
    description: 'Calculate cut and fill volumes for site preparation with adjustments for soil type and compaction.',
    icon: Truck,
    category: 'Earthwork',
    timeEstimate: '2 min'
  }
];
