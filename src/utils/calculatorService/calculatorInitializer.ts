
import { supabase } from "@/integrations/supabase/client";
import { saveCalculator } from './calculatorSaver';

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
    const { calculators } = await import('../calculators');
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
