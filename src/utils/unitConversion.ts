
// Function to parse values with units
export const parseUnits = (value: string | number): number => {
  if (typeof value === 'number') return value;
  
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return 0;
  
  return numericValue;
};

// Basic unit conversion functions
export const convertLengthImperialToMetric = (value: number): number => {
  return value * 0.3048; // feet to meters
};

export const convertLengthMetricToImperial = (value: number): number => {
  return value / 0.3048; // meters to feet
};

export const convertAreaImperialToMetric = (value: number): number => {
  return value * 0.092903; // square feet to square meters
};

export const convertAreaMetricToImperial = (value: number): number => {
  return value / 0.092903; // square meters to square feet
};

export const convertVolumeImperialToMetric = (value: number): number => {
  return value * 0.0283168; // cubic feet to cubic meters
};

export const convertVolumeMetricToImperial = (value: number): number => {
  return value / 0.0283168; // cubic meters to cubic feet
};

export const convertWeightImperialToMetric = (value: number): number => {
  return value * 0.453592; // pounds to kilograms
};

export const convertWeightMetricToImperial = (value: number): number => {
  return value / 0.453592; // kilograms to pounds
};
