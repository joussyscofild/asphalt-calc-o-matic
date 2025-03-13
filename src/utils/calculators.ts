
import { Calculator } from './calculatorTypes';
import { categories } from './calculatorCategories';
import { asphaltCalculators } from './calculators/asphaltCalculators';
import { concreteCalculators } from './calculators/concreteCalculators';
import { costCalculators } from './calculators/costCalculators';
import { earthworkCalculators } from './calculators/earthworkCalculators';
import { measurementCalculators } from './calculators/measurementCalculators';
import { specialtyCalculators } from './calculators/specialtyCalculators';

// Combine all calculators into a single array
export const calculators: Calculator[] = [
  ...asphaltCalculators,
  ...concreteCalculators,
  ...costCalculators,
  ...earthworkCalculators,
  ...measurementCalculators,
  ...specialtyCalculators
];

export { Calculator, categories };

// Helper functions
export const getCalculatorById = (id: string): Calculator | undefined => {
  return calculators.find(calc => calc.id === id);
};

export const getCalculatorsByCategory = (categoryId: string): Calculator[] => {
  return calculators.filter(calc => calc.category.toLowerCase() === categoryId.toLowerCase());
};

export const getFeaturedCalculators = (): Calculator[] => {
  return calculators.filter(calc => calc.featured);
};
