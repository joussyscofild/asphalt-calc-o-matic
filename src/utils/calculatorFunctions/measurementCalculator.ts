import { CalculatorResults } from '@/components/calculator/CalculatorForm';

export const calculateMaterialConversion = (formData: Record<string, any>): CalculatorResults => {
  console.log("Running material conversion calculator with data:", formData);
  
  // Extract form values
  const quantity = Number(formData.quantity) || 0;
  const materialType = formData.materialType || 'asphalt';
  const fromUnit = formData.fromUnit || 'cubic_yards';
  const toUnit = formData.toUnit || 'tons';
  
  // Define material densities and conversion factors
  const materialProperties = {
    'asphalt': {
      density: 145, // lbs per cubic foot
      unitConversions: {
        'cubic_yards_to_tons': 1.35,
        'tons_to_cubic_yards': 0.74,
        'square_feet_to_tons': 0.0007 * 2, // Assuming 2" thickness
        'tons_to_square_feet': 1400 / 2 // Assuming 2" thickness
      }
    },
    'concrete': {
      density: 150, // lbs per cubic foot
      unitConversions: {
        'cubic_yards_to_tons': 2.025,
        'tons_to_cubic_yards': 0.49,
        'square_feet_to_cubic_yards': 0.012, // Assuming 4" thickness
        'cubic_yards_to_square_feet': 81 // Assuming 4" thickness
      }
    },
    'gravel': {
      density: 105, // lbs per cubic foot
      unitConversions: {
        'cubic_yards_to_tons': 1.4,
        'tons_to_cubic_yards': 0.71,
        'square_feet_to_cubic_yards': 0.0092, // Assuming 3" thickness
        'cubic_yards_to_square_feet': 108 // Assuming 3" thickness
      }
    },
    'sand': {
      density: 100, // lbs per cubic foot
      unitConversions: {
        'cubic_yards_to_tons': 1.35,
        'tons_to_cubic_yards': 0.74,
        'square_feet_to_cubic_yards': 0.0075, // Assuming 2.5" thickness
        'cubic_yards_to_square_feet': 133 // Assuming 2.5" thickness
      }
    },
    'topsoil': {
      density: 90, // lbs per cubic foot
      unitConversions: {
        'cubic_yards_to_tons': 1.1,
        'tons_to_cubic_yards': 0.91,
        'square_feet_to_cubic_yards': 0.0062, // Assuming 2" thickness
        'cubic_yards_to_square_feet': 162 // Assuming 2" thickness
      }
    }
  };
  
  const material = materialProperties[materialType as keyof typeof materialProperties];
  
  // Perform conversion
  let result = 0;
  let conversionDescription = '';
  let density = material.density;
  
  // Create a conversion key
  const conversionKey = `${fromUnit}_to_${toUnit}`;
  
  // Handle different conversion types
  if (material.unitConversions[conversionKey as keyof typeof material.unitConversions]) {
    // Use predefined conversion factor
    result = quantity * material.unitConversions[conversionKey as keyof typeof material.unitConversions];
    conversionDescription = `Converted using standard ${materialType} conversion factor`;
  } else {
    // Handle generic conversions based on density and standard formulas
    switch(conversionKey) {
      case 'cubic_feet_to_cubic_yards':
        result = quantity / 27;
        conversionDescription = 'Converted using 27 cubic feet = 1 cubic yard';
        break;
      case 'cubic_yards_to_cubic_feet':
        result = quantity * 27;
        conversionDescription = 'Converted using 1 cubic yard = 27 cubic feet';
        break;
      case 'cubic_feet_to_tons':
        result = (quantity * density) / 2000;
        conversionDescription = `Converted using ${materialType} density of ${density} lbs/cubic foot`;
        break;
      case 'tons_to_cubic_feet':
        result = (quantity * 2000) / density;
        conversionDescription = `Converted using ${materialType} density of ${density} lbs/cubic foot`;
        break;
      default:
        result = quantity; // Default to same value if conversion not defined
        conversionDescription = 'Direct conversion not available';
    }
  }
  
  // Format unit labels for display
  const unitLabels = {
    'cubic_yards': 'cubic yards',
    'cubic_feet': 'cubic feet',
    'tons': 'tons',
    'square_feet': 'square feet',
    'square_yards': 'square yards'
  };
  
  const fromUnitLabel = unitLabels[fromUnit as keyof typeof unitLabels];
  const toUnitLabel = unitLabels[toUnit as keyof typeof unitLabels];
  
  // Calculate approximate cost
  const unitCosts = {
    'asphalt': {
      'tons': 100,
      'cubic_yards': 135,
      'square_feet': 3.5
    },
    'concrete': {
      'cubic_yards': 120,
      'tons': 60,
      'square_feet': 6
    },
    'gravel': {
      'tons': 45,
      'cubic_yards': 65,
      'square_feet': 1.2
    },
    'sand': {
      'tons': 30,
      'cubic_yards': 40,
      'square_feet': 0.8
    },
    'topsoil': {
      'tons': 35,
      'cubic_yards': 40,
      'square_feet': 0.7
    }
  };
  
  // Fix: Simplify the type assertions to avoid parser confusion
  let costEstimate = 0;
  const materialCosts = unitCosts[materialType as keyof typeof unitCosts];
  
  if (materialCosts && toUnit in materialCosts) {
    // Use type assertion in a simplified way
    const materialType2 = materialType as keyof typeof unitCosts;
    const toUnit2 = toUnit as keyof (typeof unitCosts)[typeof materialType2];
    costEstimate = result * unitCosts[materialType2][toUnit2];
  }
  
  return {
    results: [
      {
        label: 'Original Amount',
        value: `${quantity.toFixed(2)} ${fromUnitLabel}`,
        description: `${materialType} material`,
        highlight: false
      },
      {
        label: 'Converted Amount',
        value: `${result.toFixed(2)} ${toUnitLabel}`,
        description: conversionDescription,
        highlight: true
      },
      {
        label: 'Density',
        value: `${density} lbs/cubic foot`,
        description: `Standard density for ${materialType}`,
        highlight: false
      },
      {
        label: 'Estimated Cost',
        value: costEstimate > 0 ? `$${costEstimate.toFixed(2)}` : 'Not available',
        description: costEstimate > 0 ? `Based on average ${materialType} prices` : 'Cost data not available for this conversion',
        highlight: costEstimate > 0
      }
    ],
    recommendations: [
      {
        text: `${materialType.charAt(0).toUpperCase() + materialType.slice(1)} has a standard density of ${density} lbs/cubic foot, which affects conversion accuracy.`,
        type: 'info'
      },
      {
        text: 'Material properties can vary based on moisture content, compaction, and mix design.',
        type: 'warning'
      },
      {
        text: 'For ordering materials, always add 5-10% extra to account for waste and settling.',
        type: 'tip'
      }
    ]
  };
};

export const calculateSlopeGrade = (formData: Record<string, any>): CalculatorResults => {
  console.log("Running slope & grade calculator with data:", formData);
  
  // Extract form values based on input method
  const inputMethod = formData.inputMethod || 'rise_run';
  
  let rise = 0;
  let run = 0;
  let distance = 0;
  let angle = 0;
  let percent = 0;
  let ratio = '';
  
  // Calculate based on input method
  if (inputMethod === 'rise_run') {
    rise = Number(formData.rise) || 0;
    run = Number(formData.run) || 0;
    
    // Calculate other values
    percent = (rise / run) * 100;
    angle = Math.atan(rise / run) * (180 / Math.PI);
    distance = Math.sqrt(rise * rise + run * run);
    
    // Calculate ratio (simplify if possible)
    const gcd = findGCD(rise, run);
    ratio = `${(rise/gcd).toFixed(0)}:${(run/gcd).toFixed(0)}`;
    
  } else if (inputMethod === 'angle') {
    angle = Number(formData.angle) || 0;
    run = Number(formData.horizontalDistance) || 0;
    
    // Calculate other values
    const angleRad = angle * (Math.PI / 180);
    rise = run * Math.tan(angleRad);
    percent = Math.tan(angleRad) * 100;
    distance = run / Math.cos(angleRad);
    
    // Calculate ratio (simplify if possible)
    // Using an approximate fraction conversion
    const riseInt = Math.round(rise * 100);
    const runInt = Math.round(run * 100);
    const gcd = findGCD(riseInt, runInt);
    ratio = `${(riseInt/gcd).toFixed(0)}:${(runInt/gcd).toFixed(0)}`;
    
  } else if (inputMethod === 'percent') {
    percent = Number(formData.percent) || 0;
    run = Number(formData.horizontalDistance) || 0;
    
    // Calculate other values
    rise = run * (percent / 100);
    angle = Math.atan(percent / 100) * (180 / Math.PI);
    distance = Math.sqrt(rise * rise + run * run);
    
    // Calculate ratio
    const gcd = findGCD(Math.round(percent), 100);
    ratio = `${(percent/gcd).toFixed(0)}:${(100/gcd).toFixed(0)}`;
  }
  
  // Determine safety classification
  let slopeClassification = '';
  let safetyRecommendation = '';
  
  if (percent < 3) {
    slopeClassification = 'Nearly Flat';
    safetyRecommendation = 'Minimal drainage concerns, suitable for most applications.';
  } else if (percent < 10) {
    slopeClassification = 'Gentle Slope';
    safetyRecommendation = 'Good for general drainage, accessible for most vehicles and pedestrians.';
  } else if (percent < 20) {
    slopeClassification = 'Moderate Slope';
    safetyRecommendation = 'May require erosion control measures, challenging for some vehicles.';
  } else if (percent < 30) {
    slopeClassification = 'Steep Slope';
    safetyRecommendation = 'Erosion control required, not suitable for standard driveways or walkways.';
  } else {
    slopeClassification = 'Very Steep';
    safetyRecommendation = 'Significant erosion risk, requires specialized design and reinforcement.';
  }
  
  // Generate recommendations based on application type
  const applicationType = formData.applicationType || 'general';
  let applicationRecommendation = '';
  
  switch(applicationType) {
    case 'driveway':
      applicationRecommendation = percent > 15 
        ? 'Slope exceeds recommended maximum for driveways. Consider redesign or special surface treatments.'
        : 'Slope is acceptable for driveways. Use proper drainage channels and appropriate paving material.';
      break;
    case 'drainage':
      applicationRecommendation = percent < 1
        ? 'Slope may be insufficient for adequate drainage. Minimum 1% recommended.'
        : 'Slope is suitable for drainage applications. Ensure proper channel design.';
      break;
    case 'ramp':
      applicationRecommendation = percent > 8.33
        ? 'Slope exceeds ADA maximum of 8.33% for ramps. Redesign required for accessibility compliance.'
        : 'Slope meets ADA requirements for ramps. Ensure proper handrails and landings.';
      break;
    case 'retaining':
      applicationRecommendation = percent > 50
        ? 'Extremely steep slope. Engineered retaining wall with geotechnical analysis required.'
        : 'Standard retaining wall design should be adequate. Consider drainage behind wall.';
      break;
    default:
      applicationRecommendation = 'Consider specific application requirements for proper slope design.';
  }
  
  return {
    results: [
      {
        label: 'Slope Percentage',
        value: `${percent.toFixed(2)}%`,
        description: 'Vertical rise divided by horizontal run × 100',
        highlight: true
      },
      {
        label: 'Angle',
        value: `${angle.toFixed(2)}°`,
        description: 'Angle in degrees from horizontal',
        highlight: false
      },
      {
        label: 'Slope Ratio',
        value: ratio,
        description: 'Simplified rise to run ratio',
        highlight: false
      },
      {
        label: 'Rise',
        value: `${rise.toFixed(2)} units`,
        description: 'Vertical height change',
        highlight: false
      },
      {
        label: 'Run',
        value: `${run.toFixed(2)} units`,
        description: 'Horizontal distance',
        highlight: false
      },
      {
        label: 'Actual Distance',
        value: `${distance.toFixed(2)} units`,
        description: 'Length along the slope',
        highlight: false
      },
      {
        label: 'Classification',
        value: slopeClassification,
        description: safetyRecommendation,
        highlight: false
      }
    ],
    recommendations: [
      {
        text: applicationRecommendation,
        type: 'info'
      },
      {
        text: percent > 30 
          ? 'Steep slopes require erosion control measures such as retaining walls, stepped designs, or vegetation.'
          : 'Consider water runoff direction and speed when designing drainage systems.',
        type: percent > 30 ? 'warning' : 'tip'
      },
      {
        text: applicationType === 'driveway' 
          ? 'For driveways in cold climates, keep slopes under 10% to prevent winter access issues.'
          : applicationType === 'ramp'
            ? 'ADA compliance requires 1:12 ratio (8.33%) maximum with rest landings every 30 feet.'
            : 'Standard drainage pipes should have a minimum slope of 1% for proper flow.',
        type: 'tip'
      }
    ]
  };
};

// Helper function to find Greatest Common Divisor
function findGCD(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while(b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}
