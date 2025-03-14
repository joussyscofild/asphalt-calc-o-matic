
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
