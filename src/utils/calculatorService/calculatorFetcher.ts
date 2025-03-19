
import { supabase } from "@/integrations/supabase/client";
import { Calculator, CalculatorField, ExternalArticle } from '../calculatorTypes';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { calculators as localCalculators } from '../calculators'; // Import local calculator definitions for fallback

// Fetch all calculators
export const fetchCalculators = async (): Promise<Calculator[]> => {
  try {
    console.log("Fetching calculators from Supabase...");
    
    const { data: calculatorsData, error: calculatorsError } = await supabase
      .from('calculators')
      .select('*')
      .order('category');

    if (calculatorsError) {
      console.error("Error fetching calculators:", calculatorsError);
      throw calculatorsError;
    }

    if (!calculatorsData || calculatorsData.length === 0) {
      console.log("No calculators found in database, using local calculator definitions instead");
      return localCalculators;
    }

    console.log(`Found ${calculatorsData.length} calculators in database`);

    // Convert the calculators data to our Calculator type
    const calculators: Calculator[] = await Promise.all(
      calculatorsData.map(async (calc) => {
        // Fetch fields for this calculator
        const { data: fieldsData, error: fieldsError } = await supabase
          .from('calculator_fields')
          .select('*')
          .eq('calculator_id', calc.id)
          .order('sort_order');

        if (fieldsError) {
          console.error(`Error fetching fields for calculator ${calc.id}:`, fieldsError);
          throw fieldsError;
        }

        // Fetch related items
        const { data: relatedData, error: relatedError } = await supabase
          .from('calculator_related_items')
          .select('*')
          .eq('calculator_id', calc.id);

        if (relatedError) {
          console.error(`Error fetching related items for calculator ${calc.id}:`, relatedError);
          throw relatedError;
        }

        // Convert DB field data to our CalculatorField type
        const fields: CalculatorField[] = fieldsData?.map(field => ({
          id: field.field_id,
          label: field.label,
          type: field.type as 'number' | 'select' | 'radio' | 'checkbox',
          placeholder: field.placeholder,
          defaultValue: field.default_value,
          required: field.required,
          options: field.options,
          unit: field.unit,
          min: field.min,
          max: field.max,
          step: field.step,
          helperText: field.helper_text
        })) || [];

        // Process related items
        const relatedCalculators = relatedData
          ?.filter(item => item.related_type === 'calculator')
          .map(item => item.related_id) || [];

        const relatedArticles = relatedData
          ?.filter(item => item.related_type === 'article')
          .map(item => item.related_id) || [];

        // Get external articles if they exist
        const externalArticles: ExternalArticle[] = calc.external_articles || [];

        // Get the icon from Lucide
        const iconName = calc.icon as keyof typeof LucideIcons;
        const icon = LucideIcons[iconName] || LucideIcons.Calculator;

        // Handle the tags property - it may not exist in the database schema
        // This fixes the TypeScript error by explicitly checking for the tags property
        const tags = Array.isArray(calc['tags']) ? calc['tags'] : [];

        return {
          id: calc.id,
          title: calc.title,
          description: calc.description,
          longDescription: calc.long_description,
          icon: icon as LucideIcon,
          category: calc.category,
          timeEstimate: calc.time_estimate,
          featured: calc.featured,
          formula: calc.formula,
          fields: fields,
          relatedCalculators: relatedCalculators,
          relatedArticles: relatedArticles,
          externalArticles: externalArticles,
          tags: tags
        };
      })
    );

    console.log(`Successfully processed ${calculators.length} calculators from database`);
    
    // Check for the specific calculator we're looking for
    const hasAsphaltCalc = calculators.some(calc => calc.id === 'asphalt-calculator');
    console.log(`Has asphalt-calculator: ${hasAsphaltCalc}`);
    
    if (!hasAsphaltCalc) {
      // If the asphalt calculator is not in the database, find it from local calculators and add it
      const localAsphaltCalc = localCalculators.find(calc => calc.id === 'asphalt-calculator');
      if (localAsphaltCalc) {
        console.log("Adding asphalt-calculator from local definitions");
        calculators.push(localAsphaltCalc);
      }
    }

    return calculators;
  } catch (error) {
    console.error("Error in fetchCalculators:", error);
    console.log("Falling back to local calculator definitions");
    return localCalculators;
  }
};
