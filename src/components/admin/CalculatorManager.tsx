
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { calculators, Calculator as CalculatorType } from '@/utils/calculators';
import CalculatorEditor from './CalculatorEditor';

const CalculatorManager: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCalculator, setSelectedCalculator] = useState<CalculatorType | undefined>(undefined);
  
  // Start creating a new calculator
  const handleCreateNew = () => {
    setSelectedCalculator(undefined);
    setIsEditing(true);
  };
  
  // Edit an existing calculator
  const handleEdit = (calculator: CalculatorType) => {
    setSelectedCalculator(calculator);
    setIsEditing(true);
  };
  
  // Save calculator changes
  const handleSave = (calculator: CalculatorType) => {
    // In a real application, you would save the calculator to your backend
    toast({
      title: "Calculator Saved",
      description: `Successfully saved "${calculator.title}"`,
    });
    setIsEditing(false);
  };
  
  // Cancel calculator edit
  const handleCancel = () => {
    setIsEditing(false);
  };
  
  if (isEditing) {
    return (
      <CalculatorEditor
        calculator={selectedCalculator}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Calculators</h2>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} />
          Create New Calculator
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {calculators.map((calculator) => (
          <div
            key={calculator.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Calculator className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{calculator.title}</h3>
                <p className="text-sm text-muted-foreground">{calculator.category}</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => handleEdit(calculator)}>
              Edit
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalculatorManager;
