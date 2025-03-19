
import { CalculatorResults } from '@/components/calculator/CalculatorForm';

export const calculateParkingLot = (formData: Record<string, any>): CalculatorResults => {
  console.log("Running parking lot calculator with data:", formData);
  
  // Extract form values
  const lotLength = Number(formData.lotLength) || 0;
  const lotWidth = Number(formData.lotWidth) || 0;
  const parkingType = formData.parkingType || 'standard';
  const includeHandicap = formData.includeHandicap !== false;
  const includeLandscaping = formData.includeLandscaping !== false;
  const includeLighting = formData.includeLighting !== false;
  
  // Calculate total area in square feet
  const totalArea = lotLength * lotWidth;
  
  // Parking space dimensions
  const parkingDimensions = {
    'standard': { length: 18, width: 9, aisle: 24 }, // feet
    'compact': { length: 16, width: 8, aisle: 22 },
    'angled': { length: 17, width: 9, aisle: 15 }
  };
  
  const selectedParking = parkingDimensions[parkingType as keyof typeof parkingDimensions];
  
  // Calculate space needed per parking space (including driving aisle)
  const spacePerCar = selectedParking.length * selectedParking.width * 2; // Doubling to account for access aisle
  
  // Estimate maximum number of parking spaces
  // Using 70% efficiency factor to account for real-world layout constraints
  const efficiencyFactor = 0.7;
  let maxParkingSpaces = Math.floor((totalArea * efficiencyFactor) / spacePerCar);
  
  // Adjust for handicap spaces if included
  let handicapSpaces = 0;
  if (includeHandicap && maxParkingSpaces > 0) {
    if (maxParkingSpaces <= 25) {
      handicapSpaces = 1;
    } else if (maxParkingSpaces <= 50) {
      handicapSpaces = 2;
    } else if (maxParkingSpaces <= 100) {
      handicapSpaces = 4;
    } else if (maxParkingSpaces <= 200) {
      handicapSpaces = 6;
    } else if (maxParkingSpaces <= 500) {
      handicapSpaces = 8;
    } else {
      handicapSpaces = 10;
    }
  }
  
  // Adjust for landscaping if included
  let landscapingArea = 0;
  if (includeLandscaping) {
    // Typically 5-10% of parking lot for landscaping
    landscapingArea = totalArea * 0.08; // Using 8%
    maxParkingSpaces = Math.floor(maxParkingSpaces * 0.92); // Reduce spaces by 8%
  }
  
  // Calculate asphalt needed
  const pavementArea = includeLandscaping ? totalArea - landscapingArea : totalArea;
  
  // Calculate asphalt tonnage (2" thickness)
  const thicknessInFeet = 2 / 12; // 2 inches in feet
  const asphaltVolume = pavementArea * thicknessInFeet;
  const asphaltWeight = asphaltVolume * 145 / 2000; // 145 lbs per cu ft, 2000 lbs per ton
  
  // Calculate striping length
  // Each space needs approx 2-3 lines
  const stripingLength = maxParkingSpaces * selectedParking.width * 2.5;
  
  // Calculate estimates for lighting if included
  let lightPoles = 0;
  if (includeLighting) {
    // Rough estimate: 1 light pole per 10,000 sq ft
    lightPoles = Math.ceil(totalArea / 10000);
    lightPoles = Math.max(lightPoles, 2); // Minimum 2 poles
  }
  
  // Cost estimates
  const asphaltCost = asphaltWeight * 100; // $100 per ton
  const stripingCost = stripingLength * 0.5; // $0.50 per foot
  const landscapingCost = landscapingArea * 2; // $2 per sq ft
  const lightingCost = lightPoles * 2500; // $2500 per pole installation
  
  // Total cost
  const totalCost = asphaltCost + stripingCost + landscapingCost + lightingCost;
  
  return {
    results: [
      {
        label: 'Total Area',
        value: `${totalArea.toFixed(0)} sq ft`,
        description: 'Total parking lot area',
        highlight: false
      },
      {
        label: 'Parking Spaces',
        value: `${maxParkingSpaces} spaces`,
        description: `Including ${handicapSpaces} handicap spaces`,
        highlight: true
      },
      {
        label: 'Asphalt Needed',
        value: `${asphaltWeight.toFixed(2)} tons`,
        description: '2" thick asphalt layer',
        highlight: false
      },
      {
        label: 'Striping Length',
        value: `${stripingLength.toFixed(0)} ft`,
        description: 'Total length of parking stripes',
        highlight: false
      },
      {
        label: 'Landscaping Area',
        value: includeLandscaping ? `${landscapingArea.toFixed(0)} sq ft` : 'Not included',
        description: 'Area reserved for landscaping',
        highlight: false
      },
      {
        label: 'Lighting',
        value: includeLighting ? `${lightPoles} light poles` : 'Not included',
        description: 'Estimated number of light poles needed',
        highlight: false
      },
      {
        label: 'Estimated Cost',
        value: `$${totalCost.toFixed(2)}`,
        description: 'Total cost for all materials and installation',
        highlight: true
      }
    ],
    recommendations: [
      {
        text: `For a ${lotLength}' × ${lotWidth}' parking lot with ${parkingType} spaces, we recommend including proper drainage systems.`,
        type: 'info'
      },
      {
        text: includeHandicap 
          ? 'Ensure handicap spaces are properly located near entrances with accessible routes.' 
          : 'ADA compliance requires including handicap-accessible parking spaces.',
        type: includeHandicap ? 'info' : 'warning'
      },
      {
        text: 'Consider permeable pavement options for improved stormwater management and potential regulatory compliance.',
        type: 'tip'
      }
    ]
  };
};

export const calculateProjectTimeline = (formData: Record<string, any>): CalculatorResults => {
  console.log("Running project timeline estimator with data:", formData);
  
  // Extract form values
  const projectType = formData.projectType || 'parking-lot';
  const projectSize = Number(formData.projectSize) || 0;
  const crewSize = Number(formData.crewSize) || 4;
  const equipmentLevel = formData.equipmentLevel || 'standard';
  const seasonalFactor = formData.seasonalFactor || 'optimal';
  const complexityFactor = formData.complexityFactor || 'medium';
  
  // Base productivity rates by project type (in sq ft per day per worker)
  const baseProductivityRates = {
    'parking-lot': 400,
    'roadway': 300,
    'driveway': 500,
    'sidewalk': 150,
    'subdivision': 250
  };
  
  // Get base productivity rate
  const baseRate = baseProductivityRates[projectType as keyof typeof baseProductivityRates];
  
  // Adjustment factors
  
  // Equipment efficiency multiplier
  const equipmentMultiplier = {
    'minimal': 0.7,
    'standard': 1.0,
    'advanced': 1.3
  }[equipmentLevel];
  
  // Weather/seasonal adjustment
  const seasonalMultiplier = {
    'challenging': 0.6, // Bad weather, extreme temperatures
    'average': 0.85,    // Some weather delays expected
    'optimal': 1.0      // Ideal working conditions
  }[seasonalFactor];
  
  // Project complexity adjustment
  const complexityMultiplier = {
    'simple': 1.2,    // Straightforward project, minimal obstacles
    'medium': 1.0,    // Average complexity
    'complex': 0.7    // Complex project with many details/obstacles
  }[complexityFactor];
  
  // Calculate daily productivity rate for the crew
  const dailyProductivity = baseRate * crewSize * equipmentMultiplier * seasonalMultiplier * complexityMultiplier;
  
  // Calculate project duration in days
  const rawDays = projectSize / dailyProductivity;
  
  // Round up to whole days and add contingency
  const workDays = Math.ceil(rawDays * 1.1); // Adding 10% contingency
  
  // Convert to weeks and days
  const weeks = Math.floor(workDays / 5); // Assuming 5-day work weeks
  const remainingDays = workDays % 5;
  
  // Generate project phases with durations
  const phases = [];
  
  if (projectType === 'parking-lot' || projectType === 'roadway' || projectType === 'subdivision') {
    phases.push({
      name: 'Site Preparation',
      duration: Math.ceil(workDays * 0.2),
      description: 'Clearing, grading, and base preparation'
    });
    phases.push({
      name: 'Drainage Installation',
      duration: Math.ceil(workDays * 0.15),
      description: 'Storm drains, culverts, retention systems'
    });
    phases.push({
      name: 'Base Construction',
      duration: Math.ceil(workDays * 0.25),
      description: 'Aggregate base placement and compaction'
    });
    phases.push({
      name: 'Paving Operations',
      duration: Math.ceil(workDays * 0.25),
      description: 'Asphalt or concrete placement'
    });
    phases.push({
      name: 'Finishing',
      duration: Math.ceil(workDays * 0.15),
      description: 'Striping, signage, and final details'
    });
  } else {
    phases.push({
      name: 'Site Preparation',
      duration: Math.ceil(workDays * 0.3),
      description: 'Clearing, grading, and base preparation'
    });
    phases.push({
      name: 'Construction',
      duration: Math.ceil(workDays * 0.5),
      description: 'Main construction phase'
    });
    phases.push({
      name: 'Finishing',
      duration: Math.ceil(workDays * 0.2),
      description: 'Final details and cleanup'
    });
  }
  
  // Calculate calendar duration (accounting for weekends)
  const calendarDays = workDays + Math.floor(workDays / 5) * 2;
  
  // Calculate start and end dates
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + calendarDays);
  
  // Format dates
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return {
    results: [
      {
        label: 'Project Duration',
        value: weeks > 0 
          ? `${weeks} week${weeks !== 1 ? 's' : ''}${remainingDays > 0 ? ` and ${remainingDays} day${remainingDays !== 1 ? 's' : ''}` : ''}`
          : `${workDays} working day${workDays !== 1 ? 's' : ''}`,
        description: 'Estimated working days to complete project',
        highlight: true
      },
      {
        label: 'Calendar Duration',
        value: `${calendarDays} calendar days`,
        description: 'Including weekends and non-working days',
        highlight: false
      },
      {
        label: 'Timeline',
        value: `${formatDate(startDate)} to ${formatDate(endDate)}`,
        description: 'Projected start and end dates',
        highlight: true
      },
      {
        label: 'Daily Productivity',
        value: `${dailyProductivity.toFixed(0)} sq ft per day`,
        description: 'Estimated crew productivity rate',
        highlight: false
      },
      {
        label: 'Labor Hours',
        value: `${(workDays * crewSize * 8).toFixed(0)} hours`,
        description: 'Total estimated labor hours',
        highlight: false
      }
    ],
    // Fix: Ensure all recommendation types are strictly 'info', 'warning', 'tip', or 'error'
    recommendations: [
      // Map phases to recommendations with explicit 'info' type
      ...phases.map(phase => ({
        text: `${phase.name}: ${phase.duration} working days - ${phase.description}`,
        type: 'info' as const // Use 'as const' to ensure TypeScript recognizes this as a literal
      })),
      {
        text: seasonalFactor === 'challenging' 
          ? 'Consider scheduling buffer days to account for weather delays.' 
          : 'Schedule critical operations during optimal weather conditions.',
        type: seasonalFactor === 'challenging' ? 'warning' : 'tip'
      },
      {
        text: 'Communicate this timeline with all stakeholders and develop a detailed project schedule.',
        type: 'tip'
      }
    ]
  };
};

export const calculateRoofingMaterial = (formData: Record<string, any>): CalculatorResults => {
  console.log("Running roofing material calculator with data:", formData);
  
  // Extract form values
  const roofLength = Number(formData.roofLength) || 0;
  const roofWidth = Number(formData.roofWidth) || 0;
  const pitch = Number(formData.pitch) || 4; // Roof pitch (rise in inches per 12 inches of run)
  const roofingType = formData.roofingType || 'asphalt';
  const includeIceBarrier = formData.includeIceBarrier === true;
  const hasValleys = formData.hasValleys === true;
  const hasGables = formData.hasGables === true;
  
  // Calculate roof area
  // Convert pitch to roof multiplier
  const pitchMultiplier = 1 + (pitch / 24); // Approximation of area increase due to slope
  
  // Calculate base area
  const baseArea = roofLength * roofWidth;
  
  // Calculate actual roof area
  const actualArea = baseArea * pitchMultiplier;
  
  // Add waste factor based on complexity
  let wasteFactor = 1.1; // Default 10% waste
  
  if (hasValleys && hasGables) {
    wasteFactor = 1.15; // 15% waste for complex roofs
  } else if (hasValleys || hasGables) {
    wasteFactor = 1.12; // 12% waste for moderately complex roofs
  }
  
  // Calculate total area including waste
  const totalArea = actualArea * wasteFactor;
  
  // Material quantities based on roofing type
  let primaryUnitLabel = '';
  let primaryUnitQuantity = 0;
  let primaryCostPerUnit = 0;
  
  // Underlayment quantity (comes in 4 square rolls, 1 square = 100 sq ft)
  const underlaymentRolls = Math.ceil(totalArea / 400);
  
  // Ice barrier if included (typically 3 feet up from eave)
  let iceBarrierRolls = 0;
  if (includeIceBarrier) {
    // Estimate 3 feet up from each eave side
    const iceBarrierArea = roofLength * 3 * 2; // Both eaves
    iceBarrierRolls = Math.ceil(iceBarrierArea / 100); // Comes in 1 square rolls
  }
  
  // Flashing and accessories
  const ridgeLength = roofLength;
  
  // Calculate material quantities and costs based on roofing type
  switch (roofingType) {
    case 'asphalt':
      primaryUnitLabel = 'bundles';
      // 3 bundles per square (100 sq ft)
      primaryUnitQuantity = Math.ceil(totalArea / 100 * 3);
      primaryCostPerUnit = 35; // $35 per bundle
      break;
      
    case 'metal':
      primaryUnitLabel = 'panels';
      // Typical metal panel is 3 feet wide and 16 feet long (48 sq ft)
      primaryUnitQuantity = Math.ceil(totalArea / 48);
      primaryCostPerUnit = 65; // $65 per panel
      break;
      
    case 'tile':
      primaryUnitLabel = 'tiles';
      // Approx 100 tiles per square (100 sq ft)
      primaryUnitQuantity = Math.ceil(totalArea / 100 * 100);
      primaryCostPerUnit = 1.50; // $1.50 per tile
      break;
      
    case 'wood':
      primaryUnitLabel = 'bundles';
      // 4 bundles per square for wood shakes
      primaryUnitQuantity = Math.ceil(totalArea / 100 * 4);
      primaryCostPerUnit = 50; // $50 per bundle
      break;
      
    default:
      primaryUnitLabel = 'squares';
      primaryUnitQuantity = Math.ceil(totalArea / 100);
      primaryCostPerUnit = 100; // $100 per square
  }
  
  // Calculate accessory quantities
  const drip_edge_length = (roofLength * 2) + (roofWidth * 2);
  const roofing_nails = Math.ceil(primaryUnitQuantity * 2.5 * 0.5); // 2.5 lbs per square, in half lb boxes
  
  // Calculate costs
  const primaryMaterialCost = primaryUnitQuantity * primaryCostPerUnit;
  const underlaymentCost = underlaymentRolls * 100; // $100 per roll
  const iceBarrierCost = iceBarrierRolls * 120; // $120 per roll
  const accessoriesCost = (drip_edge_length * 2) + (roofing_nails * 5) + (ridgeLength * 5);
  
  const totalCost = primaryMaterialCost + underlaymentCost + iceBarrierCost + accessoriesCost;
  
  return {
    results: [
      {
        label: 'Roof Area',
        value: `${actualArea.toFixed(0)} sq ft`,
        description: `${(actualArea / 100).toFixed(1)} squares (including pitch factor)`,
        highlight: false
      },
      {
        label: 'Total With Waste',
        value: `${totalArea.toFixed(0)} sq ft`,
        description: `${(totalArea / 100).toFixed(1)} squares (with ${((wasteFactor - 1) * 100).toFixed(0)}% waste factor)`,
        highlight: true
      },
      {
        label: `${roofingType.charAt(0).toUpperCase() + roofingType.slice(1)} Roofing`,
        value: `${primaryUnitQuantity} ${primaryUnitLabel}`,
        description: `Primary roofing material needed`,
        highlight: true
      },
      {
        label: 'Underlayment',
        value: `${underlaymentRolls} rolls`,
        description: 'Synthetic or felt underlayment',
        highlight: false
      },
      {
        label: 'Ice & Water Barrier',
        value: includeIceBarrier ? `${iceBarrierRolls} rolls` : 'Not included',
        description: includeIceBarrier ? 'For eaves and valleys' : 'Consider for cold climates',
        highlight: false
      },
      {
        label: 'Drip Edge',
        value: `${drip_edge_length.toFixed(0)} linear feet`,
        description: 'For roof perimeter',
        highlight: false
      },
      {
        label: 'Estimated Cost',
        value: `$${totalCost.toFixed(2)}`,
        description: 'Materials only, excluding labor',
        highlight: true
      }
    ],
    recommendations: [
      {
        text: `For a ${pitch}/12 pitch roof with ${roofingType} roofing, ensure adequate ventilation for optimal performance.`,
        type: 'info'
      },
      {
        text: includeIceBarrier 
          ? 'Ice barrier provides additional protection against ice dams and water infiltration.' 
          : 'Consider adding ice barrier in cold climates to prevent ice dam damage.',
        type: 'tip'
      },
      {
        text: 'Check local building codes for specific requirements regarding underlayment and fastening patterns.',
        type: 'warning'
      }
    ]
  };
};
