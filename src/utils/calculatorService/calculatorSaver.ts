
import { supabase } from "@/integrations/supabase/client";
import { Calculator } from '../calculatorTypes';
import { Json } from '@/integrations/supabase/types';

// Save a calculator to Supabase
export const saveCalculator = async (calculator: Calculator): Promise<void> => {
  try {
    // Ensure we have a valid icon name from the icon object
    const iconName = calculator.icon.name || 'Calculator';
    
    // Convert ExternalArticles to Json compatible format
    const externalArticlesJson = calculator.externalArticles as unknown as Json;
    
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
        featured_image: calculator.featuredImage,
        formula: calculator.formula,
        external_articles: externalArticlesJson,
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
