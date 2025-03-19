
import { CalculatorResults } from '@/components/calculator/CalculatorForm';

export const calculateEarthworkExcavation = (formData: Record<string, any>): CalculatorResults => {
  console.log("Running earthwork excavation calculator with data:", formData);
  
  // Extract form values
  const length = Number(formData.length) || 0;
  const width = Number(formData.width) || 0;
  const depth = Number(formData.depth) || 0;
  const soilType = formData.soilType || 'loam';
  const hasSwell = formData.hasSwell !== false;
  const hasShrink = formData.hasShrink !== false;
  const needsCompaction = formData.needsCompaction !== false;
  
  // Calculate volume in cubic yards
  const cubicFeet = length * width * depth;
  const cubicYards = cubicFeet / 27;
  
  // Swell/shrink factors based on soil type
  const soilFactors = {
    'sand': { swellFactor: 1.10, shrinkFactor: 0.95, compactionFactor: 0.90 },
    'loam': { swellFactor: 1.15, shrinkFactor: 0.90, compactionFactor: 0.85 },
    'clay': { swellFactor: 1.30, shrinkFactor: 0.80, compactionFactor: 0.75 },
    'gravel': { swellFactor: 1.12, shrinkFactor: 0.92, compactionFactor: 0.88 },
    'topsoil': { swellFactor: 1.20, shrinkFactor: 0.85, compactionFactor: 0.80 },
    'rock': { swellFactor: 1.50, shrinkFactor: 0.95, compactionFactor: 0.95 }
  };
  
  const selectedSoil = soilFactors[soilType as keyof typeof soilFactors];
  
  // Calculate bank volume (in-situ volume)
  const bankVolume = cubicYards;
  
  // Calculate loose volume (after excavation) with swell
  const looseVolume = hasSwell ? bankVolume * selectedSoil.swellFactor : bankVolume;
  
  // Calculate compacted volume (if fill or backfill is compacted)
  const compactedVolume = needsCompaction 
    ? (hasShrink ? bankVolume * selectedSoil.shrinkFactor : bankVolume)
    : (hasShrink ? looseVolume * selectedSoil.shrinkFactor : looseVolume);
  
  // Calculate weight in tons (approx. conversion)
  // Different soil types have different densities
  const soilDensities = {
    'sand': 1.25, // tons per cubic yard
    'loam': 1.1,
    'clay': 1.05,
    'gravel': 1.35,
    'topsoil': 0.95,
    'rock': 1.5
  };
  
  const density = soilDensities[soilType as keyof typeof soilDensities];
  const weightInTons = bankVolume * density;
  
  // Calculate truck loads needed (assuming 10 cubic yard capacity)
  const truckCapacity = 10; // cubic yards per truck
  const truckLoads = Math.ceil(looseVolume / truckCapacity);
  
  // Calculate hauling cost ($150 per truck load, average)
  const haulingCost = truckLoads * 150;
  
  // Calculate excavation time (rough estimate)
  let excavationHours;
  if (bankVolume < 50) {
    excavationHours = 2;
  } else if (bankVolume < 200) {
    excavationHours = 6;
  } else {
    excavationHours = Math.ceil(bankVolume / 50);
  }
  
  return {
    results: [
      {
        label: 'Bank Volume',
        value: `${bankVolume.toFixed(2)} cubic yards`,
        description: 'Volume of soil in its natural state',
        highlight: false
      },
      {
        label: 'Loose Volume',
        value: `${looseVolume.toFixed(2)} cubic yards`,
        description: hasSwell ? 'Volume after excavation with swell factor' : 'Volume after excavation',
        highlight: false
      },
      {
        label: 'Compacted Volume',
        value: `${compactedVolume.toFixed(2)} cubic yards`,
        description: needsCompaction ? 'Volume after compaction' : 'Volume without compaction',
        highlight: false
      },
      {
        label: 'Weight',
        value: `${weightInTons.toFixed(2)} tons`,
        description: `Based on ${soilType} soil density`,
        highlight: false
      },
      {
        label: 'Truck Loads',
        value: `${truckLoads} loads`,
        description: `Based on ${truckCapacity} cubic yard truck capacity`,
        highlight: true
      },
      {
        label: 'Hauling Cost',
        value: `$${haulingCost.toFixed(2)}`,
        description: 'Estimated hauling expenses',
        highlight: true
      },
      {
        label: 'Excavation Time',
        value: `${excavationHours} hours`,
        description: 'Estimated equipment operation time',
        highlight: false
      }
    ],
    recommendations: [
      {
        text: `${soilType.charAt(0).toUpperCase() + soilType.slice(1)} soil typically has a swell factor of ${selectedSoil.swellFactor.toFixed(2)}x when excavated.`,
        type: 'info'
      },
      {
        text: needsCompaction ? 'Ensure proper moisture content for optimal compaction results.' : 'Consider compaction for any backfill to prevent settlement.',
        type: 'tip'
      },
      {
        text: 'Check local regulations for soil disposal or reuse requirements.',
        type: 'warning'
      }
    ]
  };
};
