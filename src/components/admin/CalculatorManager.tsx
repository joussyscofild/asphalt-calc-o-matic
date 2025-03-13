
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Calculator as CalculatorType } from '@/utils/calculatorTypes';
import CalculatorEditor from './CalculatorEditor';
import { useCalculatorAdmin } from '@/hooks/use-calculator-admin';

const CalculatorManager: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCalculator, setSelectedCalculator] = useState<CalculatorType | undefined>(undefined);
  
  const {
    calculators,
    isLoading,
    handleSaveCalculator,
    handleDeleteCalculator
  } = useCalculatorAdmin();
  
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
    handleSaveCalculator(calculator);
    setIsEditing(false);
  };
  
  // Cancel calculator edit
  const handleCancel = () => {
    setIsEditing(false);
  };
  
  // Delete calculator
  const handleDelete = (calculatorId: string) => {
    handleDeleteCalculator(calculatorId);
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
      
      {isLoading ? (
        <div className="py-12 text-center">
          <Calculator className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
          <p className="text-muted-foreground">Loading calculators...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {calculators.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-asphalt mb-2">No calculators found</h3>
              <p className="text-concrete-dark mb-4">
                Get started by creating your first calculator.
              </p>
              <Button onClick={handleCreateNew}>
                Create Calculator
              </Button>
            </div>
          ) : (
            calculators.map((calculator) => (
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
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleEdit(calculator)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(calculator.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CalculatorManager;
