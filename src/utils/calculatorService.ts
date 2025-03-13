
import { supabase } from "@/integrations/supabase/client";
import { Calculator, CalculatorField } from './calculatorTypes';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

// Fetch all calculators
export const fetchCalculators = async (): Promise<Calculator[]> => {
  try {
    const { data: calculatorsData, error: calculatorsError } = await supabase
      .from('calculators')
      .select('*')
      .order('category');

    if (calculatorsError) {
      console.error("Error fetching calculators:", calculatorsError);
      throw calculatorsError;
    }

    if (!calculatorsData || calculatorsData.length === 0) {
      return [];
    }

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

        // Get the icon from Lucide
        const iconName = calc.icon as keyof typeof LucideIcons;
        const icon = LucideIcons[iconName] || LucideIcons.Calculator;

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
          relatedArticles: relatedArticles
        };
      })
    );

    return calculators;
  } catch (error) {
    console.error("Error in fetchCalculators:", error);
    throw error;
  }
};

// Save a calculator to Supabase
export const saveCalculator = async (calculator: Calculator): Promise<void> => {
  try {
    // Ensure we have a valid icon name from the icon object
    const iconName = calculator.icon.name || 'Calculator';
    
    // Save the calculator basic info
    const { error: calculatorError } = await supabase
      .from('calculators')
      .upsert({
        id: calculator.id,
        title: calculator.title,
        description: calculator.description,
        long_description: calculator.longDescription,
        icon: iconName,
        category: calculator.category,
        time_estimate: calculator.timeEstimate,
        featured: calculator.featured,
        formula: calculator.formula,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'id'
      });

    if (calculatorError) {
      console.error("Error saving calculator:", calculatorError);
      throw calculatorError;
    }

    // Delete existing fields and related items to replace them
    const { error: deleteFieldsError } = await supabase
      .from('calculator_fields')
      .delete()
      .eq('calculator_id', calculator.id);

    if (deleteFieldsError) {
      console.error("Error deleting existing fields:", deleteFieldsError);
      throw deleteFieldsError;
    }

    const { error: deleteRelatedError } = await supabase
      .from('calculator_related_items')
      .delete()
      .eq('calculator_id', calculator.id);

    if (deleteRelatedError) {
      console.error("Error deleting existing related items:", deleteRelatedError);
      throw deleteRelatedError;
    }

    // Insert fields if they exist
    if (calculator.fields && calculator.fields.length > 0) {
      const fieldsToInsert = calculator.fields.map((field, index) => ({
        calculator_id: calculator.id,
        field_id: field.id,
        label: field.label,
        type: field.type,
        placeholder: field.placeholder,
        default_value: field.defaultValue !== undefined ? field.defaultValue : null,
        required: field.required !== undefined ? field.required : true,
        unit: field.unit,
        min: field.min,
        max: field.max,
        step: field.step,
        helper_text: field.helperText,
        options: field.options,
        sort_order: index
      }));

      const { error: fieldsError } = await supabase
        .from('calculator_fields')
        .insert(fieldsToInsert);

      if (fieldsError) {
        console.error("Error inserting fields:", fieldsError);
        throw fieldsError;
      }
    }

    // Insert related calculators if they exist
    if (calculator.relatedCalculators && calculator.relatedCalculators.length > 0) {
      const relatedCalcsToInsert = calculator.relatedCalculators.map(relatedId => ({
        calculator_id: calculator.id,
        related_type: 'calculator',
        related_id: relatedId
      }));

      const { error: relatedCalcsError } = await supabase
        .from('calculator_related_items')
        .insert(relatedCalcsToInsert);

      if (relatedCalcsError) {
        console.error("Error inserting related calculators:", relatedCalcsError);
        throw relatedCalcsError;
      }
    }

    // Insert related articles if they exist
    if (calculator.relatedArticles && calculator.relatedArticles.length > 0) {
      // Filter out non-UUID related articles to avoid database errors
      const validArticles = calculator.relatedArticles.filter(id => {
        // Basic UUID validation (not comprehensive but helps catch obvious errors)
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      });
      
      if (validArticles.length > 0) {
        const relatedArticlesToInsert = validArticles.map(relatedId => ({
          calculator_id: calculator.id,
          related_type: 'article',
          related_id: relatedId
        }));

        const { error: relatedArticlesError } = await supabase
          .from('calculator_related_items')
          .insert(relatedArticlesToInsert);

        if (relatedArticlesError) {
          console.error("Error inserting related articles:", relatedArticlesError);
          throw relatedArticlesError;
        }
      }
    }
  } catch (error) {
    console.error("Error in saveCalculator:", error);
    throw error;
  }
};

// Delete a calculator from Supabase
export const deleteCalculator = async (calculatorId: string): Promise<void> => {
  try {
    // Delete the calculator
    const { error } = await supabase
      .from('calculators')
      .delete()
      .eq('id', calculatorId);

    if (error) {
      console.error("Error deleting calculator:", error);
      throw error;
    }

    // Fields and related items will be automatically deleted due to the cascading delete
  } catch (error) {
    console.error("Error in deleteCalculator:", error);
    throw error;
  }
};

// Initialize the calculators table with seed data
export const initializeCalculators = async (): Promise<void> => {
  try {
    // Check if calculators already exist
    const { data, error } = await supabase
      .from('calculators')
      .select('id')
      .limit(1);

    if (error) {
      console.error("Error checking existing calculators:", error);
      throw error;
    }

    // If calculators already exist, don't re-initialize
    if (data && data.length > 0) {
      console.log("Calculators already initialized, skipping");
      return;
    }

    // Import seed data from our existing calculator files
    const { calculators } = await import('./calculators');
    console.log(`Initializing ${calculators.length} calculators`);

    // Save each calculator
    for (const calculator of calculators) {
      await saveCalculator(calculator);
    }

    console.log("Calculator initialization complete");
  } catch (error) {
    console.error("Error in initializeCalculators:", error);
    throw error;
  }
};
