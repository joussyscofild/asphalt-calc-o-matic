
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { fetchCalculators } from '@/utils/calculatorService';
import { Calculator as CalculatorType, CalculatorField } from '@/utils/calculatorTypes';
import { useToast } from '@/hooks/use-toast';
import { getDefaultFields } from '@/utils/calculatorFunctions';
import CalculatorForm from '@/components/calculator/CalculatorForm';
import CalculatorSidebar from '@/components/calculator/CalculatorSidebar';
import CalculatorLoader from '@/components/calculator/CalculatorLoader';
import CalculatorNotFound from '@/components/calculator/CalculatorNotFound';
import { supabase } from '@/integrations/supabase/client';

const Calculator = () => {
  const { id = '' } = useParams<{ id: string }>();
  const [calculator, setCalculator] = useState<CalculatorType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { toast } = useToast();

  // Load calculator details from Supabase
  useEffect(() => {
    const loadCalculator = async () => {
      setIsLoading(true);
      try {
        const calculators = await fetchCalculators();
        const found = calculators.find(calc => calc.id === id);
        
        if (found) {
          setCalculator(found);
          
          // Initialize form data with default values
          if (found.fields) {
            const initialFormData: Record<string, any> = {};
            found.fields.forEach(field => {
              if (field.defaultValue !== undefined) {
                initialFormData[field.id] = field.defaultValue;
              }
            });
            setFormData(initialFormData);
          }
        }
      } catch (error) {
        console.error('Error loading calculator:', error);
        toast({
          title: 'Error Loading Calculator',
          description: 'Could not load the calculator. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCalculator();
  }, [id, toast]);

  if (isLoading) {
    return <CalculatorLoader />;
  }

  if (!calculator) {
    return <CalculatorNotFound />;
  }

  // Default fields for calculators that don't have them defined yet
  // Explicitly cast the result of getDefaultFields to CalculatorField[] to satisfy TypeScript
  const calculatorFields: CalculatorField[] = calculator.fields?.length 
    ? calculator.fields 
    : getDefaultFields(id) as CalculatorField[];

  return (
    <div className="container-custom py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/calculators">Calculators</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>{calculator.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-asphalt/10 text-asphalt mr-4">
                {React.createElement(calculator.icon, { size: 24 })}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-asphalt">{calculator.title}</h1>
                <p className="text-concrete-dark">{calculator.category}</p>
              </div>
            </div>

            <p className="mb-8 text-concrete-dark">{calculator.longDescription || calculator.description}</p>

            <CalculatorForm
              calculatorId={id}
              fields={calculatorFields}
              initialFormData={formData}
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <CalculatorSidebar calculator={calculator} />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
