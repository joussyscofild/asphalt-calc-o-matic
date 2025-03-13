
import { type Calculator, type CalculatorField } from './calculatorTypes';
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

// Re-export types and categories
export { categories };
export type { Calculator, CalculatorField };

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

export const searchCalculators = (query: string): Calculator[] => {
  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  
  return calculators.filter(calc => {
    const searchableText = [
      calc.title,
      calc.description,
      calc.longDescription,
      calc.category,
      ...(calc.tags || [])
    ].join(' ').toLowerCase();
    
    // Check if all search terms are present in the searchable text
    return searchTerms.every(term => searchableText.includes(term));
  });
};
