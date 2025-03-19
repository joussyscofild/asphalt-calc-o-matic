
import { CalculatorResults } from '@/components/calculator/CalculatorForm';

type AsphaltCalculatorInputs = {
  length: number;
  width: number;
  thickness: number;
  density: number;
  costPerTon: number;
};

export const calculateAsphalt = (formData: Record<string, any>): CalculatorResults => {
  console.log("Running asphalt calculator with data:", formData);
  
  // Extract and convert the form values
  const inputs: AsphaltCalculatorInputs = {
    length: Number(formData.length) || 0,
    width: Number(formData.width) || 0,
    thickness: Number(formData.thickness) || 0,
    density: Number(formData.density) || 145,
    costPerTon: Number(formData.costPerTon) || 100,
  };

  // Calculate volume in cubic feet
  const thicknessInFeet = inputs.thickness / 12;
  const cubicFeet = inputs.length * inputs.width * thicknessInFeet;
  
  // Calculate tons
  const pounds = cubicFeet * inputs.density;
  const tons = pounds / 2000;
  
  // Calculate cost
  const cost = tons * inputs.costPerTon;
  
  // Determine mix type recommendation based on thickness
  let mixType = "Standard Hot Mix Asphalt";
  if (inputs.thickness < 1.5) {
    mixType = "Fine Hot Mix Asphalt";
  } else if (inputs.thickness > 3) {
    mixType = "Heavy-Duty Hot Mix Asphalt";
  }

  console.log("Asphalt calculator results:", {
    cubicFeet,
    tons,
    cost,
    mixType
  });

  return {
    results: [
      {
        label: 'Volume',
        value: `${cubicFeet.toFixed(2)} cubic feet`,
        description: 'Total volume of asphalt needed',
        highlight: false
      },
      {
        label: 'Weight',
        value: `${tons.toFixed(2)} tons`,
        description: 'Total weight of asphalt needed',
        highlight: false
      },
      {
        label: 'Estimated Cost',
        value: `$${cost.toFixed(2)}`,
        description: 'Estimated cost based on current price per ton',
        highlight: true
      },
      {
        label: 'Recommended Mix Type',
        value: mixType,
        description: 'Suggested asphalt mix based on thickness',
        highlight: false
      }
    ],
    recommendations: [
      {
        text: `For a ${inputs.thickness}" thick asphalt layer, we recommend using ${mixType}.`,
        type: 'info'
      },
      {
        text: 'Order an additional 10% of material to account for waste and compaction.',
        type: 'tip'
      }
    ]
  };
};

export const calculateAsphaltThickness = (formData: Record<string, any>): CalculatorResults => {
  console.log("Running asphalt thickness estimator with data:", formData);
  
  // Extract and convert form values
  const trafficLoad = formData.trafficLoad || 'light';
  const subgradeType = formData.subgradeType || 'fair';
  const climate = formData.climate || 'moderate';
  
  // Base thickness recommendations based on traffic load
  const baseThickness = {
    'light': 2.0,  // inches
    'medium': 3.0,
    'heavy': 4.0
  }[trafficLoad];
  
  // Subgrade adjustment factors
  const subgradeAdjustment = {
    'poor': 0.5,  // add inches
    'fair': 0.0,
    'good': -0.5  // subtract inches
  }[subgradeType];
  
  // Climate adjustment factors
  const climateAdjustment = {
    'cold': 0.5,  // add inches
    'moderate': 0.0,
    'hot': 0.25   // add inches for rutting resistance
  }[climate];
  
  // Calculate recommended thickness
  let recommendedThickness = baseThickness + subgradeAdjustment + climateAdjustment;
  
  // Ensure minimum thickness
  recommendedThickness = Math.max(recommendedThickness, 1.5);
  
  // Round to nearest quarter inch
  recommendedThickness = Math.ceil(recommendedThickness * 4) / 4;
  
  // Determine base layer requirements
  const baseLayerThickness = {
    'light': 4,  // inches
    'medium': 6,
    'heavy': 8
  }[trafficLoad];
  
  // Adjust base layer for poor subgrade
  const adjustedBaseThickness = subgradeType === 'poor' 
    ? baseLayerThickness + 2 
    : baseLayerThickness;
  
  // Determine if subbase is needed
  const needsSubbase = trafficLoad === 'heavy' || subgradeType === 'poor';
  const subbaseThickness = needsSubbase ? 6 : 0;
  
  // Calculate total pavement structure
  const totalStructureThickness = recommendedThickness + adjustedBaseThickness + subbaseThickness;
  
  // Recommended asphalt mix type
  const asphaltMixType = recommendedThickness <= 2 
    ? 'Fine-graded Hot Mix Asphalt (HMA)'
    : recommendedThickness >= 3.5 
      ? 'Heavy-Duty HMA with larger aggregate'
      : 'Standard HMA';
  
  return {
    results: [
      {
        label: 'Recommended Asphalt Thickness',
        value: `${recommendedThickness.toFixed(2)} inches`,
        description: 'Optimized for your project conditions',
        highlight: true
      },
      {
        label: 'Base Layer',
        value: `${adjustedBaseThickness} inches`,
        description: 'Crushed aggregate base',
        highlight: false
      },
      {
        label: 'Subbase Layer',
        value: needsSubbase ? `${subbaseThickness} inches` : 'Not required',
        description: needsSubbase ? 'Granular subbase material' : 'Not needed for your conditions',
        highlight: false
      },
      {
        label: 'Total Pavement Structure',
        value: `${totalStructureThickness.toFixed(2)} inches`,
        description: 'Combined thickness of all layers',
        highlight: false
      },
      {
        label: 'Recommended Mix Type',
        value: asphaltMixType,
        description: 'Best asphalt mix for your application',
        highlight: false
      }
    ],
    recommendations: [
      {
        text: `For ${trafficLoad} traffic on ${subgradeType} subgrade in a ${climate} climate, we recommend ${recommendedThickness.toFixed(2)} inches of asphalt.`,
        type: 'info'
      },
      {
        text: 'Consider using a geotextile separator between subgrade and base for poor soil conditions.',
        type: subgradeType === 'poor' ? 'warning' : 'tip'
      },
      {
        text: climate === 'cold' 
          ? 'In cold climates, ensure proper drainage to prevent frost heave damage.'
          : climate === 'hot'
            ? 'In hot climates, consider a mix with polymer modification to resist rutting.'
            : 'Ensure proper compaction of all layers during installation.',
        type: 'tip'
      }
    ]
  };
};
