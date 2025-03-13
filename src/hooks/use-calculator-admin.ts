
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Calculator } from '@/utils/calculatorTypes';
import { fetchCalculators, saveCalculator, deleteCalculator, initializeCalculators } from '@/utils/calculatorService';

export const useCalculatorAdmin = () => {
  const { toast } = useToast();
  const [calculators, setCalculators] = useState<Calculator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Load calculators from Supabase on component mount
  useEffect(() => {
    const loadCalculators = async () => {
      setIsLoading(true);
      try {
        // Initialize calculators if needed (first load)
        if (refreshTrigger === 0) {
          await initializeCalculators();
        }
        
        const loadedCalculators = await fetchCalculators();
        setCalculators(loadedCalculators);
        console.log("Loaded", loadedCalculators.length, "calculators from Supabase");
      } catch (error) {
        console.error("Error loading calculators:", error);
        toast({
          title: "Error Loading Calculators",
          description: "There was a problem loading the calculators. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCalculators();
  }, [refreshTrigger, toast]);
  
  // Handler for saving a calculator
  const handleSaveCalculator = async (calculator: Calculator) => {
    try {
      console.log("Admin dashboard saving calculator:", calculator.id);
      
      await saveCalculator(calculator);
      
      toast({
        title: "Calculator Saved",
        description: `Successfully saved calculator "${calculator.title}"`,
      });
      
      // Force a refresh to show updated calculators
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Error saving calculator:", error);
      toast({
        title: "Error Saving Calculator",
        description: "There was an error saving the calculator. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Handler for deleting a calculator
  const handleDeleteCalculator = async (calculatorId: string) => {
    try {
      const calculator = calculators.find(c => c.id === calculatorId);
      if (!calculator) {
        throw new Error("Calculator not found");
      }
      
      const calculatorTitle = calculator.title;
      
      await deleteCalculator(calculatorId);
      
      toast({
        title: "Calculator Deleted",
        description: `"${calculatorTitle}" has been deleted.`,
      });
      
      // Force a refresh
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Error deleting calculator:", error);
      toast({
        title: "Error Deleting Calculator",
        description: "There was an error deleting the calculator. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    calculators,
    isLoading,
    refreshTrigger,
    handleSaveCalculator,
    handleDeleteCalculator
  };
};
