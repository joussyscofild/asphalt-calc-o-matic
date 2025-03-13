
import { supabase } from "@/integrations/supabase/client";

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
