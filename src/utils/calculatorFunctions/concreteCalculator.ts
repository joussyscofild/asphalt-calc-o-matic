
import { CalculatorResults } from '@/components/calculator/CalculatorForm';

type ConcreteCalculatorInputs = {
  length: number;
  width: number;
  depth: number;
  wasteFactor: number;
};

export const calculateConcreteVolume = (formData: Record<string, any>): CalculatorResults => {
  console.log("Running concrete volume calculator with data:", formData);
  
  // Extract and convert the form values
  const inputs: ConcreteCalculatorInputs = {
    length: Number(formData.length) || 0,
    width: Number(formData.width) || 0,
    depth: Number(formData.depth) || 0,
    wasteFactor: Number(formData.wasteFactor) || 5,
  };

  // Convert depth from inches to feet
  const depthInFeet = inputs.depth / 12;
  
  // Calculate volume in cubic feet
  const cubicFeet = inputs.length * inputs.width * depthInFeet;
  
  // Calculate cubic yards (27 cubic feet = 1 cubic yard)
  const cubicYards = cubicFeet / 27;
  
  // Apply waste factor
  const wasteMultiplier = 1 + (inputs.wasteFactor / 100);
  const totalCubicYards = cubicYards * wasteMultiplier;
  
  // Estimate bags of concrete (80lb bags, ~0.6 cubic feet per bag)
  const bagsNeeded = Math.ceil(cubicFeet / 0.6);
  
  // Estimate cost (average $120 per cubic yard)
  const estimatedCost = totalCubicYards * 120;

  console.log("Concrete calculator results:", {
    cubicFeet,
    cubicYards,
    totalCubicYards,
    bagsNeeded,
    estimatedCost
  });

  return {
    results: [
      {
        label: 'Volume',
        value: `${cubicFeet.toFixed(2)} cubic feet`,
        description: 'Total volume of concrete needed',
        highlight: false
      },
      {
        label: 'Volume',
        value: `${cubicYards.toFixed(2)} cubic yards`,
        description: 'Volume in cubic yards (before waste factor)',
        highlight: false
      },
      {
        label: 'Total Volume',
        value: `${totalCubicYards.toFixed(2)} cubic yards`,
        description: `Including ${inputs.wasteFactor}% waste factor`,
        highlight: true
      },
      {
        label: 'Estimated Bags',
        value: `${bagsNeeded} bags (80lb)`,
        description: 'Number of 80lb concrete bags needed for DIY',
        highlight: false
      },
      {
        label: 'Estimated Cost',
        value: `$${estimatedCost.toFixed(2)}`,
        description: 'Estimated cost at $120 per cubic yard',
        highlight: true
      }
    ],
    recommendations: [
      {
        text: `For a ${inputs.depth}" thick concrete slab, we recommend using a minimum of 3000 PSI rated concrete.`,
        type: 'info'
      },
      {
        text: 'Add reinforcement mesh or rebar for structural integrity, especially for driveways or load-bearing applications.',
        type: 'tip'
      },
      {
        text: 'Order slightly more concrete than calculated to account for spillage and uneven surfaces.',
        type: 'tip'
      }
    ]
  };
};

export const calculateRetainingWall = (formData: Record<string, any>): CalculatorResults => {
  console.log("Running retaining wall calculator with data:", formData);
  
  // Extract form values
  const length = Number(formData.length) || 0;
  const height = Number(formData.height) || 0;
  const blockType = formData.blockType || 'standard';
  const includeBackfill = formData.includeBackfill === true;
  const includeDrainage = formData.includeDrainage === true;
  
  // Block dimensions and details based on type
  const blockDetails = {
    'standard': { width: 12, height: 8, depth: 12, weightLbs: 35, costEach: 3.5 },
    'large': { width: 18, height: 8, depth: 12, weightLbs: 50, costEach: 5 },
    'natural-stone': { width: 10, height: 6, depth: 10, weightLbs: 30, costEach: 7.5 }
  };
  
  const selectedBlock = blockDetails[blockType as keyof typeof blockDetails];
  
  // Calculate number of blocks needed
  const rowsNeeded = Math.ceil((height * 12) / selectedBlock.height);
  const blocksPerRow = Math.ceil((length * 12) / selectedBlock.width);
  const totalBlocks = rowsNeeded * blocksPerRow;
  
  // Calculate base aggregate needed
  const baseWidth = (selectedBlock.depth / 12) * 2; // Base is twice as wide as block depth
  const baseDepth = 0.5; // 6 inches in feet
  const baseVolume = length * baseWidth * baseDepth; // in cubic feet
  const baseTons = baseVolume * 0.06; // Approx 120 lbs per cubic foot = 0.06 tons
  
  // Calculate backfill if needed
  let backfillVolume = 0;
  let backfillTons = 0;
  if (includeBackfill) {
    backfillVolume = length * (selectedBlock.depth / 12) * height * 0.5; // In cubic feet
    backfillTons = backfillVolume * 0.06; // Approx 120 lbs per cubic foot = 0.06 tons
  }
  
  // Calculate drainage materials if needed
  let drainagePipeLength = 0;
  let drainageGravelTons = 0;
  if (includeDrainage) {
    drainagePipeLength = length;
    drainageGravelTons = length * 0.5 * height * 0.04; // Simplified calculation
  }
  
  // Calculate costs
  const blockCost = totalBlocks * selectedBlock.costEach;
  const baseCost = baseTons * 45; // $45 per ton
  const backfillCost = backfillTons * 35; // $35 per ton
  const drainageCost = (drainagePipeLength * 3) + (drainageGravelTons * 50); // Pipe $3/ft, gravel $50/ton
  const totalCost = blockCost + baseCost + backfillCost + drainageCost;
  
  return {
    results: [
      {
        label: 'Wall Blocks',
        value: `${totalBlocks} blocks`,
        description: `${blocksPerRow} blocks per row × ${rowsNeeded} rows`,
        highlight: true
      },
      {
        label: 'Base Aggregate',
        value: `${baseTons.toFixed(2)} tons`,
        description: 'Crushed stone for the foundation',
        highlight: false
      },
      {
        label: 'Backfill Material',
        value: includeBackfill ? `${backfillTons.toFixed(2)} tons` : 'Not included',
        description: includeBackfill ? 'Drainage aggregate behind wall' : 'Add backfill for proper drainage',
        highlight: false
      },
      {
        label: 'Drainage System',
        value: includeDrainage ? `${drainagePipeLength.toFixed(2)} ft pipe, ${drainageGravelTons.toFixed(2)} tons gravel` : 'Not included',
        description: includeDrainage ? 'Perforated pipe and drainage gravel' : 'Add drainage to prevent water buildup',
        highlight: false
      },
      {
        label: 'Estimated Cost',
        value: `$${totalCost.toFixed(2)}`,
        description: 'Total cost for all materials',
        highlight: true
      }
    ],
    recommendations: [
      {
        text: `For a ${height} feet high wall, ensure proper drainage to prevent water buildup behind the wall.`,
        type: 'warning'
      },
      {
        text: 'Consult with a structural engineer for walls taller than 4 feet for safety requirements.',
        type: 'info'
      },
      {
        text: 'Consider geotextile fabric between the soil and drainage aggregate to prevent soil migration.',
        type: 'tip'
      }
    ]
  };
};
