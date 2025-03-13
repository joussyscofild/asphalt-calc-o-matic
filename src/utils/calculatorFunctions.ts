
// Calculator-specific calculation functions

/**
 * Calculate asphalt tonnage based on input dimensions and density
 */
export const calculateAsphaltTonnage = (
  length: number, 
  width: number, 
  thickness: number, 
  density: number
): string => {
  if (length && width && thickness && density) {
    const thicknessInFeet = thickness / 12;
    const cubicFeet = length * width * thicknessInFeet;
    const pounds = cubicFeet * density;
    const tons = pounds / 2000;
    return tons.toFixed(2);
  }
  return '';
};

/**
 * Calculate paving cost based on area and material/labor costs
 */
export const calculatePavingCost = (
  area: number, 
  materialCost: number, 
  laborCost: number | undefined, 
  additionalCosts: number | undefined
): string => {
  if (area && materialCost) {
    const materialTotal = area * materialCost;
    const laborTotal = laborCost ? area * laborCost : 0;
    const additional = additionalCosts || 0;
    const totalCost = materialTotal + laborTotal + additional;
    return totalCost.toFixed(2);
  }
  return '';
};

/**
 * Calculate concrete volume in cubic yards
 */
export const calculateConcreteVolume = (
  length: number, 
  width: number, 
  depth: number
): string => {
  if (length && width && depth) {
    const depthInFeet = depth / 12;
    const cubicFeet = length * width * depthInFeet;
    const cubicYards = cubicFeet / 27;
    return cubicYards.toFixed(2);
  }
  return '';
};

/**
 * Convert material from cubic yards to tons
 */
export const calculateMaterialConversion = (
  cubicYards: number, 
  materialType: string
): string => {
  if (cubicYards && materialType) {
    // Different density factors based on material
    const densityFactors: Record<string, number> = {
      'asphalt': 2.025, // tons per cubic yard
      'concrete': 2.025,
      'gravel': 1.35,
      'sand': 1.35,
      'dirt': 1.1,
    };
    const factor = densityFactors[materialType] || 1.5; // default factor
    return (cubicYards * factor).toFixed(2);
  }
  return '';
};

/**
 * Calculate slope grade in percent, degrees, and ratio
 */
export const calculateSlopeGrade = (
  rise: number, 
  run: number
): string => {
  if (rise && run) {
    const slopePercent = (rise / run) * 100;
    const slopeDegrees = Math.atan(rise / run) * (180 / Math.PI);
    const slopeRatio = `1:${(run / rise).toFixed(1)}`;
    return `${slopePercent.toFixed(1)}% (${slopeDegrees.toFixed(1)}°, ${slopeRatio})`;
  }
  return '';
};

/**
 * Calculate number of blocks needed for a retaining wall
 */
export const calculateRetainingWall = (
  wallLength: number, 
  wallHeight: number, 
  blockType: string
): string => {
  if (wallLength && wallHeight && blockType) {
    // Block sizes in square feet (face area)
    const blockSizes: Record<string, number> = {
      'standard': 0.5, // 8" x 9" face
      'large': 0.75,  // 12" x 9" face
      'jumbo': 1.0,   // 12" x 12" face
    };
    const blockSize = blockSizes[blockType] || 0.5;
    const wallArea = wallLength * wallHeight;
    const numberOfBlocks = Math.ceil(wallArea / blockSize);
    return numberOfBlocks.toString();
  }
  return '';
};

/**
 * Calculate number of parking spaces in a lot
 */
export const calculateParkingLot = (
  lotLength: number, 
  lotWidth: number, 
  spaceType: string
): string => {
  if (lotLength && lotWidth && spaceType) {
    const lotArea = lotLength * lotWidth;
    // Space sizes (including driving lanes)
    const spaceAreas: Record<string, number> = {
      'standard': 300, // sq ft per car (includes driving space)
      'compact': 250,
      'accessible': 400,
    };
    const spaceArea = spaceAreas[spaceType] || 300;
    const spaces = Math.floor(lotArea / spaceArea);
    return spaces.toString();
  }
  return '';
};

/**
 * Calculate material needed accounting for waste
 */
export const calculateMaterialWaste = (
  quantity: number, 
  wastePercent: number
): string => {
  if (quantity && wastePercent) {
    const totalNeeded = quantity * (1 + wastePercent / 100);
    const wasteMaterial = totalNeeded - quantity;
    return `${totalNeeded.toFixed(2)} (Waste: ${wasteMaterial.toFixed(2)})`;
  }
  return '';
};

/**
 * Get default fields for a calculator based on type
 */
export const getDefaultFields = (calculatorId: string) => {
  switch (calculatorId) {
    case 'asphalt-tonnage':
      return [
        {
          id: 'length',
          label: 'Length',
          type: 'number',
          placeholder: '100',
          defaultValue: 100,
          required: true,
          unit: 'feet',
          min: 0,
          helperText: 'The length of the area to be paved'
        },
        {
          id: 'width',
          label: 'Width',
          type: 'number',
          placeholder: '20',
          defaultValue: 20,
          required: true,
          unit: 'feet',
          min: 0,
          helperText: 'The width of the area to be paved'
        },
        {
          id: 'thickness',
          label: 'Thickness',
          type: 'number',
          placeholder: '2',
          defaultValue: 2,
          required: true,
          unit: 'inches',
          min: 0,
          step: 0.25,
          helperText: 'The desired thickness of the asphalt layer'
        },
        {
          id: 'density',
          label: 'Unit Weight (Density)',
          type: 'number',
          placeholder: '145',
          defaultValue: 145,
          required: true,
          unit: 'lb/ft³',
          min: 100,
          max: 200,
          helperText: 'Standard hot-mix asphalt is typically 145-150 lb/ft³'
        }
      ];
    case 'paving-cost':
      return [
        {
          id: 'area',
          label: 'Area to Pave',
          type: 'number',
          placeholder: '1000',
          defaultValue: 1000,
          required: true,
          unit: 'sq. ft.',
          min: 0,
          helperText: 'Total area that needs to be paved'
        },
        {
          id: 'materialCost',
          label: 'Material Cost',
          type: 'number',
          placeholder: '2.50',
          defaultValue: 2.5,
          required: true,
          unit: '$ per sq. ft.',
          min: 0,
          step: 0.1,
          helperText: 'Cost of asphalt material per square foot'
        },
        {
          id: 'laborCost',
          label: 'Labor Cost',
          type: 'number',
          placeholder: '1.75',
          defaultValue: 1.75,
          required: false,
          unit: '$ per sq. ft.',
          min: 0,
          step: 0.1,
          helperText: 'Cost of labor per square foot (optional)'
        },
        {
          id: 'additionalCosts',
          label: 'Additional Costs',
          type: 'number',
          placeholder: '500',
          defaultValue: 500,
          required: false,
          unit: '$',
          min: 0,
          helperText: 'Any additional costs like equipment rental, permits, etc. (optional)'
        }
      ];
    case 'concrete-volume':
      return [
        {
          id: 'length',
          label: 'Length',
          type: 'number',
          placeholder: '10',
          defaultValue: 10,
          required: true,
          unit: 'feet',
          min: 0,
          helperText: 'The length of the concrete area'
        },
        {
          id: 'width',
          label: 'Width',
          type: 'number',
          placeholder: '10',
          defaultValue: 10,
          required: true,
          unit: 'feet',
          min: 0,
          helperText: 'The width of the concrete area'
        },
        {
          id: 'depth',
          label: 'Depth',
          type: 'number',
          placeholder: '4',
          defaultValue: 4,
          required: true,
          unit: 'inches',
          min: 0,
          step: 0.25,
          helperText: 'The depth of the concrete slab'
        }
      ];
    case 'material-conversion':
      return [
        {
          id: 'cubicYards',
          label: 'Cubic Yards',
          type: 'number',
          placeholder: '10',
          defaultValue: 10,
          required: true,
          unit: 'yd³',
          min: 0,
          helperText: 'Volume in cubic yards'
        },
        {
          id: 'materialType',
          label: 'Material Type',
          type: 'select',
          required: true,
          options: [
            { value: 'asphalt', label: 'Asphalt' },
            { value: 'concrete', label: 'Concrete' },
            { value: 'gravel', label: 'Gravel' },
            { value: 'sand', label: 'Sand' },
            { value: 'dirt', label: 'Dirt' }
          ],
          helperText: 'Type of material for density calculation'
        }
      ];
    case 'slope-grade':
      return [
        {
          id: 'rise',
          label: 'Rise (Vertical Height)',
          type: 'number',
          placeholder: '10',
          defaultValue: 10,
          required: true,
          unit: 'feet',
          min: 0,
          helperText: 'The vertical distance from bottom to top'
        },
        {
          id: 'run',
          label: 'Run (Horizontal Distance)',
          type: 'number',
          placeholder: '100',
          defaultValue: 100,
          required: true,
          unit: 'feet',
          min: 0,
          helperText: 'The horizontal distance from start to end'
        }
      ];
    case 'retaining-wall':
      return [
        {
          id: 'wallLength',
          label: 'Wall Length',
          type: 'number',
          placeholder: '20',
          defaultValue: 20,
          required: true,
          unit: 'feet',
          min: 0,
          helperText: 'The length of the retaining wall'
        },
        {
          id: 'wallHeight',
          label: 'Wall Height',
          type: 'number',
          placeholder: '4',
          defaultValue: 4,
          required: true,
          unit: 'feet',
          min: 0,
          helperText: 'The height of the retaining wall'
        },
        {
          id: 'blockType',
          label: 'Block Type',
          type: 'select',
          required: true,
          options: [
            { value: 'standard', label: 'Standard (8" x 9")' },
            { value: 'large', label: 'Large (12" x 9")' },
            { value: 'jumbo', label: 'Jumbo (12" x 12")' }
          ],
          helperText: 'The size of retaining wall blocks'
        }
      ];
    case 'parking-lot':
      return [
        {
          id: 'lotLength',
          label: 'Lot Length',
          type: 'number',
          placeholder: '100',
          defaultValue: 100,
          required: true,
          unit: 'feet',
          min: 0,
          helperText: 'The length of the parking lot'
        },
        {
          id: 'lotWidth',
          label: 'Lot Width',
          type: 'number',
          placeholder: '75',
          defaultValue: 75,
          required: true,
          unit: 'feet',
          min: 0,
          helperText: 'The width of the parking lot'
        },
        {
          id: 'spaceType',
          label: 'Parking Space Type',
          type: 'select',
          required: true,
          options: [
            { value: 'standard', label: 'Standard' },
            { value: 'compact', label: 'Compact' },
            { value: 'accessible', label: 'Accessible/ADA' }
          ],
          helperText: 'The type of parking spaces'
        }
      ];
    case 'material-waste':
      return [
        {
          id: 'quantity',
          label: 'Base Quantity',
          type: 'number',
          placeholder: '100',
          defaultValue: 100,
          required: true,
          unit: 'units',
          min: 0,
          helperText: 'The calculated amount needed without waste'
        },
        {
          id: 'wastePercent',
          label: 'Waste Percentage',
          type: 'number',
          placeholder: '10',
          defaultValue: 10,
          required: true,
          unit: '%',
          min: 0,
          max: 100,
          helperText: 'Percentage to add for waste (typically 5-15%)'
        }
      ];
    default:
      return [];
  }
};

/**
 * Format the result based on calculator type
 */
export const formatCalculatorResult = (result: string | null, calculatorId: string): string | null => {
  if (result === null) return null;
  
  switch (calculatorId) {
    case 'asphalt-tonnage':
      return `${result} tons`;
    case 'concrete-volume':
      return `${result} cubic yards`;
    case 'paving-cost':
      return `$${result}`;
    case 'material-conversion':
      return `${result} tons`;
    case 'slope-grade':
      return result;
    case 'retaining-wall':
      return `${result} blocks`;
    case 'parking-lot':
      return `${result} spaces`;
    case 'material-waste':
      return result;
    default:
      return result;
  }
};

/**
 * Calculate the result based on calculator type and form data
 */
export const calculateResult = (calculatorId: string, formData: Record<string, any>): string | null => {
  switch (calculatorId) {
    case 'asphalt-tonnage':
      return calculateAsphaltTonnage(
        formData.length, 
        formData.width, 
        formData.thickness, 
        formData.density
      );
    case 'paving-cost':
      return calculatePavingCost(
        formData.area, 
        formData.materialCost, 
        formData.laborCost, 
        formData.additionalCosts
      );
    case 'concrete-volume':
      return calculateConcreteVolume(
        formData.length, 
        formData.width, 
        formData.depth
      );
    case 'material-conversion':
      return calculateMaterialConversion(
        formData.cubicYards, 
        formData.materialType
      );
    case 'slope-grade':
      return calculateSlopeGrade(
        formData.rise, 
        formData.run
      );
    case 'retaining-wall':
      return calculateRetainingWall(
        formData.wallLength, 
        formData.wallHeight, 
        formData.blockType
      );
    case 'parking-lot':
      return calculateParkingLot(
        formData.lotLength, 
        formData.lotWidth, 
        formData.spaceType
      );
    case 'material-waste':
      return calculateMaterialWaste(
        formData.quantity, 
        formData.wastePercent
      );
    default:
      return "Calculator implementation coming soon";
  }
};
