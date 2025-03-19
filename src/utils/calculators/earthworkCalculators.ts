
import { Truck } from 'lucide-react';
import { Calculator } from '../calculatorTypes';

export const earthworkCalculators: Calculator[] = [
  {
    id: 'earthwork-excavation',
    title: 'Earthwork Excavation Calculator',
    description: 'Calculate cut and fill volumes for site preparation with adjustments for soil type and compaction.',
    longDescription: 'Accurately estimate excavation quantities for your construction project with our earthwork calculator. Calculate volumes for cut and fill operations, accounting for soil type, swell and shrink factors, and compaction requirements. Our calculator helps you determine the number of truck loads needed, approximate hauling costs, and estimated excavation time.',
    icon: Truck,
    category: 'Earthwork',
    timeEstimate: '2 min',
    fields: [
      {
        id: 'length',
        label: 'Length',
        type: 'number',
        placeholder: '20',
        defaultValue: 20,
        required: true,
        unit: 'feet',
        min: 1,
        helperText: 'The length of the excavation area'
      },
      {
        id: 'width',
        label: 'Width',
        type: 'number',
        placeholder: '20',
        defaultValue: 20,
        required: true,
        unit: 'feet',
        min: 1,
        helperText: 'The width of the excavation area'
      },
      {
        id: 'depth',
        label: 'Depth',
        type: 'number',
        placeholder: '3',
        defaultValue: 3,
        required: true,
        unit: 'feet',
        min: 0.5,
        step: 0.5,
        helperText: 'The depth of the excavation'
      },
      {
        id: 'soilType',
        label: 'Soil Type',
        type: 'select',
        required: true,
        defaultValue: 'loam',
        options: [
          { value: 'sand', label: 'Sand' },
          { value: 'loam', label: 'Loam' },
          { value: 'clay', label: 'Clay' },
          { value: 'gravel', label: 'Gravel' },
          { value: 'topsoil', label: 'Topsoil' },
          { value: 'rock', label: 'Rock/Hard Pan' }
        ],
        helperText: 'Type of soil being excavated'
      },
      {
        id: 'hasSwell',
        label: 'Include Swell Factor',
        type: 'checkbox',
        defaultValue: true,
        helperText: 'Account for volume increase after excavation'
      },
      {
        id: 'hasShrink',
        label: 'Include Shrink Factor',
        type: 'checkbox',
        defaultValue: false,
        helperText: 'Account for volume decrease after compaction'
      },
      {
        id: 'needsCompaction',
        label: 'Requires Compaction',
        type: 'checkbox',
        defaultValue: false,
        helperText: 'Material will be compacted after placement'
      }
    ]
  }
];
