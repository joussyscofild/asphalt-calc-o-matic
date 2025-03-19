
import { CalculatorResults } from '@/components/calculator/CalculatorForm';

export const calculatePavingCost = (formData: Record<string, any>): CalculatorResults => {
  console.log("Running paving cost calculator with data:", formData);
  
  // Extract form values
  const area = Number(formData.area) || 0;
  const pavingType = formData.pavingType || 'asphalt';
  const thickness = Number(formData.thickness) || 2;
  const preparationNeeded = formData.preparationNeeded === true;
  const includeDrainage = formData.includeDrainage === true;
  const includeEdging = formData.includeEdging === true;
  
  // Base costs per square foot based on paving type
  const baseCosts = {
    'asphalt': 3.5,
    'concrete': 6.0,
    'pavers': 10.0,
    'gravel': 1.5
  };
  
  // Get base cost for the selected paving type
  const baseCostPerSqFt = baseCosts[pavingType as keyof typeof baseCosts];
  
  // Adjust for thickness (only applicable for asphalt and concrete)
  let thicknessMultiplier = 1.0;
  if (pavingType === 'asphalt' || pavingType === 'concrete') {
    const standardThickness = pavingType === 'asphalt' ? 2 : 4; // inches
    thicknessMultiplier = thickness / standardThickness;
  }
  
  // Calculate base material cost
  let materialCost = area * baseCostPerSqFt * thicknessMultiplier;
  
  // Calculate preparation costs
  const prepCost = preparationNeeded ? area * 1.5 : 0;
  
  // Calculate drainage costs
  const drainageCost = includeDrainage ? area * 0.75 : 0;
  
  // Calculate edging costs
  // Assuming perimeter is proportional to square root of area * 4
  const estimatedPerimeter = Math.sqrt(area) * 4;
  const edgingCost = includeEdging ? estimatedPerimeter * 5 : 0;
  
  // Labor cost (typically 40-60% of material costs)
  const laborCost = materialCost * 0.5;
  
  // Equipment costs (typically 10-20% of total)
  const equipmentCost = (materialCost + laborCost) * 0.15;
  
  // Calculate total cost
  const totalCost = materialCost + prepCost + drainageCost + edgingCost + laborCost + equipmentCost;
  
  // Calculate cost per square foot
  const costPerSqFt = totalCost / area;
  
  // Calculate timeline
  let timeEstimate: string;
  if (area < 1000) {
    timeEstimate = "1-2 days";
  } else if (area < 5000) {
    timeEstimate = "3-5 days";
  } else {
    timeEstimate = "1-2 weeks";
  }
  
  return {
    results: [
      {
        label: 'Material Cost',
        value: `$${materialCost.toFixed(2)}`,
        description: `${pavingType} for ${area} sq ft at ${baseCostPerSqFt.toFixed(2)}/sq ft`,
        highlight: false
      },
      {
        label: 'Site Preparation',
        value: `$${prepCost.toFixed(2)}`,
        description: preparationNeeded ? 'Site clearing, grading, and compaction' : 'Not included',
        highlight: false
      },
      {
        label: 'Drainage System',
        value: `$${drainageCost.toFixed(2)}`,
        description: includeDrainage ? 'Drainage installation' : 'Not included',
        highlight: false
      },
      {
        label: 'Edging/Curbing',
        value: `$${edgingCost.toFixed(2)}`,
        description: includeEdging ? 'Perimeter edging or curbing' : 'Not included',
        highlight: false
      },
      {
        label: 'Labor & Equipment',
        value: `$${(laborCost + equipmentCost).toFixed(2)}`,
        description: 'Labor, equipment rental, and operation costs',
        highlight: false
      },
      {
        label: 'Total Project Cost',
        value: `$${totalCost.toFixed(2)}`,
        description: 'Complete project costs',
        highlight: true
      },
      {
        label: 'Cost per Square Foot',
        value: `$${costPerSqFt.toFixed(2)}/sq ft`,
        description: 'Average cost per square foot',
        highlight: false
      },
      {
        label: 'Estimated Timeline',
        value: timeEstimate,
        description: 'Approximate project duration',
        highlight: false
      }
    ],
    recommendations: [
      {
        text: `For ${pavingType} paving, we recommend a thickness of ${thickness}" for optimal durability.`,
        type: 'info'
      },
      {
        text: includeDrainage ? 'Proper drainage is essential for pavement longevity.' : 'Consider adding a drainage system to extend pavement life.',
        type: includeDrainage ? 'info' : 'tip'
      },
      {
        text: 'Get multiple contractor quotes; prices can vary by 20-30% for the same specifications.',
        type: 'tip'
      }
    ]
  };
};

export const calculateMaterialWaste = (formData: Record<string, any>): CalculatorResults => {
  console.log("Running material waste calculator with data:", formData);
  
  // Extract form values
  const materialType = formData.materialType || 'asphalt';
  const quantity = Number(formData.quantity) || 0;
  const unitOfMeasure = formData.unitOfMeasure || 'sq_ft';
  const projectType = formData.projectType || 'standard';
  const cutComplexity = formData.cutComplexity || 'simple';
  const workerExperience = formData.workerExperience || 'experienced';
  
  // Base waste percentages by material type
  const baseWasteRates = {
    'asphalt': 5,
    'concrete': 7,
    'gravel': 10,
    'brick': 8,
    'pavers': 8,
    'soil': 15,
    'lumber': 12,
    'rebar': 5,
    'tile': 10
  };
  
  // Get base waste rate
  const baseWasteRate = baseWasteRates[materialType as keyof typeof baseWasteRates];
  
  // Additional waste factors
  // Project type adjustment
  const projectAdjustment = {
    'small': 2,       // Small projects have higher waste %
    'standard': 0,    // Baseline
    'large': -1       // Large projects typically have lower waste %
  }[projectType];
  
  // Cutting complexity adjustment
  const complexityAdjustment = {
    'simple': 0,       // Straight cuts, minimal waste
    'moderate': 3,     // Some complex cuts
    'complex': 7       // Many irregular cuts
  }[cutComplexity];
  
  // Worker experience adjustment
  const experienceAdjustment = {
    'novice': 5,           // Inexperienced workers generate more waste
    'somewhat': 2,         // Some experience
    'experienced': 0       // Baseline - experienced workers
  }[workerExperience];
  
  // Calculate total waste percentage
  const totalWastePercentage = baseWasteRate + projectAdjustment + complexityAdjustment + experienceAdjustment;
  
  // Ensure waste percentage is at least 2%
  const adjustedWastePercentage = Math.max(totalWastePercentage, 2);
  
  // Calculate waste amount
  const wasteAmount = (quantity * adjustedWastePercentage) / 100;
  
  // Calculate total amount needed (original + waste)
  const totalNeeded = quantity + wasteAmount;
  
  // Unit conversion and cost calculation
  let unitLabel = '';
  let costPerUnit = 0;
  let costEstimate = 0;
  
  switch (materialType) {
    case 'asphalt':
      costPerUnit = unitOfMeasure === 'tons' ? 100 : 3.5; // $100/ton or $3.5/sq ft
      unitLabel = unitOfMeasure === 'tons' ? 'tons' : 'sq ft';
      break;
    case 'concrete':
      costPerUnit = unitOfMeasure === 'cubic_yards' ? 120 : 6; // $120/cu yd or $6/sq ft
      unitLabel = unitOfMeasure === 'cubic_yards' ? 'cubic yards' : 'sq ft';
      break;
    case 'gravel':
      costPerUnit = unitOfMeasure === 'tons' ? 50 : 1.5; // $50/ton or $1.5/sq ft
      unitLabel = unitOfMeasure === 'tons' ? 'tons' : 'sq ft';
      break;
    default:
      // Default cost estimate
      costPerUnit = 5; // $5 per unit
      unitLabel = unitOfMeasure === 'sq_ft' ? 'sq ft' : unitOfMeasure;
  }
  
  costEstimate = totalNeeded * costPerUnit;
  
  return {
    results: [
      {
        label: 'Base Material Needed',
        value: `${quantity.toFixed(2)} ${unitLabel}`,
        description: 'Amount needed without accounting for waste',
        highlight: false
      },
      {
        label: 'Waste Percentage',
        value: `${adjustedWastePercentage.toFixed(1)}%`,
        description: 'Calculated waste percentage for your project',
        highlight: true
      },
      {
        label: 'Waste Amount',
        value: `${wasteAmount.toFixed(2)} ${unitLabel}`,
        description: 'Additional material needed for waste',
        highlight: false
      },
      {
        label: 'Total Material Needed',
        value: `${totalNeeded.toFixed(2)} ${unitLabel}`,
        description: 'Total amount to order (base + waste)',
        highlight: true
      },
      {
        label: 'Estimated Cost',
        value: `$${costEstimate.toFixed(2)}`,
        description: `Estimated at $${costPerUnit.toFixed(2)} per ${unitLabel}`,
        highlight: false
      }
    ],
    recommendations: [
      {
        text: `For ${materialType} with ${cutComplexity} cutting complexity, we recommend ordering ${adjustedWastePercentage.toFixed(1)}% extra material.`,
        type: 'info'
      },
      {
        text: 'Always store materials properly to prevent damage and additional waste.',
        type: 'tip'
      },
      {
        text: cutComplexity === 'complex' ? 'Consider pre-planning cuts to minimize waste from complex patterns.' : 'Simple layouts minimize material waste compared to complex designs.',
        type: 'tip'
      }
    ]
  };
};
