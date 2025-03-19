
import { Scale, CornerUpRight } from 'lucide-react';
import { Calculator } from '../calculatorTypes';

export const measurementCalculators: Calculator[] = [
  {
    id: 'material-conversion',
    title: 'Material Conversion Calculator',
    description: 'Convert between different units and measurements for construction materials including weight, volume, and area.',
    longDescription: 'Our material conversion calculator simplifies the process of converting between different units commonly used in construction. Convert cubic yards to tons, square feet to cubic yards, and other essential conversions based on material density and properties. This tool helps you communicate with suppliers and ensure you order the correct quantities for your project.',
    icon: Scale,
    category: 'Measurement',
    timeEstimate: '1 min',
    fields: [
      {
        id: 'quantity',
        label: 'Quantity',
        type: 'number',
        placeholder: '10',
        defaultValue: 10,
        required: true,
        min: 0.1,
        step: 0.1,
        helperText: 'Amount to convert'
      },
      {
        id: 'materialType',
        label: 'Material Type',
        type: 'select',
        required: true,
        defaultValue: 'asphalt',
        options: [
          { value: 'asphalt', label: 'Asphalt' },
          { value: 'concrete', label: 'Concrete' },
          { value: 'gravel', label: 'Gravel/Aggregate' },
          { value: 'sand', label: 'Sand' },
          { value: 'topsoil', label: 'Topsoil' }
        ],
        helperText: 'Type of material to convert'
      },
      {
        id: 'fromUnit',
        label: 'From Unit',
        type: 'select',
        required: true,
        defaultValue: 'cubic_yards',
        options: [
          { value: 'cubic_yards', label: 'Cubic Yards' },
          { value: 'cubic_feet', label: 'Cubic Feet' },
          { value: 'tons', label: 'Tons' },
          { value: 'square_feet', label: 'Square Feet (area)' }
        ],
        helperText: 'Starting unit of measurement'
      },
      {
        id: 'toUnit',
        label: 'To Unit',
        type: 'select',
        required: true,
        defaultValue: 'tons',
        options: [
          { value: 'tons', label: 'Tons' },
          { value: 'cubic_yards', label: 'Cubic Yards' },
          { value: 'cubic_feet', label: 'Cubic Feet' },
          { value: 'square_feet', label: 'Square Feet (area)' }
        ],
        helperText: 'Target unit of measurement'
      }
    ]
  },
  {
    id: 'slope-grade',
    title: 'Slope & Grade Calculator',
    description: 'Calculate slope percentage, angle, and ratio for drainage systems, ramps, and road design.',
    longDescription: 'Determine the proper slope for drainage, accessibility ramps, driveways, and other construction applications. Our slope calculator converts between slope percentage, angle in degrees, and rise-to-run ratio. It also provides recommendations for specific applications like ADA-compliant ramps, drainage systems, and driveways based on your project requirements.',
    icon: CornerUpRight,
    category: 'Measurement',
    timeEstimate: '1 min',
    fields: [
      {
        id: 'inputMethod',
        label: 'Input Method',
        type: 'select',
        required: true,
        defaultValue: 'rise_run',
        options: [
          { value: 'rise_run', label: 'Rise and Run' },
          { value: 'angle', label: 'Angle' },
          { value: 'percent', label: 'Percent Grade' }
        ],
        helperText: 'Choose how you want to specify the slope'
      },
      {
        id: 'rise',
        label: 'Rise (Vertical Height)',
        type: 'number',
        placeholder: '1',
        defaultValue: 1,
        required: true,
        unit: 'units',
        min: 0,
        step: 0.1,
        helperText: 'Vertical change in height'
      },
      {
        id: 'run',
        label: 'Run (Horizontal Distance)',
        type: 'number',
        placeholder: '12',
        defaultValue: 12,
        required: true,
        unit: 'units',
        min: 0.1,
        step: 0.1,
        helperText: 'Horizontal distance'
      },
      {
        id: 'angle',
        label: 'Angle',
        type: 'number',
        placeholder: '5',
        defaultValue: 5,
        required: true,
        unit: 'degrees',
        min: 0,
        max: 90,
        step: 0.1,
        helperText: 'Angle from horizontal in degrees'
      },
      {
        id: 'percent',
        label: 'Percent Grade',
        type: 'number',
        placeholder: '8.33',
        defaultValue: 8.33,
        required: true,
        unit: '%',
        min: 0,
        step: 0.01,
        helperText: 'Slope expressed as a percentage'
      },
      {
        id: 'horizontalDistance',
        label: 'Horizontal Distance',
        type: 'number',
        placeholder: '100',
        defaultValue: 100,
        required: true,
        unit: 'units',
        min: 0.1,
        helperText: 'Length of the horizontal component'
      },
      {
        id: 'applicationType',
        label: 'Application Type',
        type: 'select',
        required: false,
        defaultValue: 'general',
        options: [
          { value: 'general', label: 'General Purpose' },
          { value: 'driveway', label: 'Driveway' },
          { value: 'drainage', label: 'Drainage/Runoff' },
          { value: 'ramp', label: 'ADA Ramp' },
          { value: 'retaining', label: 'Retaining Wall' }
        ],
        helperText: 'Intended use of the slope calculation'
      }
    ]
  }
];
