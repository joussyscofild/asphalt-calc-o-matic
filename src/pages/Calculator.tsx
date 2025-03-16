
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { fetchCalculators } from '@/utils/calculatorService';
import { Calculator as CalculatorType, CalculatorField } from '@/utils/calculatorTypes';
import { useToast } from '@/hooks/use-toast';
import { getDefaultFields } from '@/utils/calculatorFunctions';
import CalculatorForm from '@/components/calculator/CalculatorForm';
import CalculatorSidebar from '@/components/calculator/CalculatorSidebar';
import CalculatorLoader from '@/components/calculator/CalculatorLoader';
import CalculatorNotFound from '@/components/calculator/CalculatorNotFound';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
        console.log(`Looking for calculator with id: ${id}`);
        const calculators = await fetchCalculators();
        console.log(`Fetched ${calculators.length} calculators`);
        
        const found = calculators.find(calc => calc.id === id);
        
        if (found) {
          console.log(`Found calculator: ${found.title}`);
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
        } else {
          console.log(`Calculator with id ${id} not found`);
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
    return (
      <>
        <Navbar />
        <div className="mt-16">
          <CalculatorLoader />
        </div>
      </>
    );
  }

  if (!calculator) {
    return (
      <>
        <Navbar />
        <div className="mt-16">
          <CalculatorNotFound />
        </div>
      </>
    );
  }

  // Default fields for calculators that don't have them defined yet
  // Explicitly cast the result of getDefaultFields to CalculatorField[] to satisfy TypeScript
  const calculatorFields: CalculatorField[] = calculator.fields?.length 
    ? calculator.fields 
    : getDefaultFields(id) as CalculatorField[];

  return (
    <>
      <Navbar />
      <div className="container-custom py-12 mt-16">
        <Breadcrumb className="mb-8">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-safety-dark dark:hover:text-safety-light">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/calculators" className="text-gray-600 dark:text-gray-400 hover:text-safety-dark dark:hover:text-safety-light">Calculators</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-gray-800 dark:text-gray-200 font-medium">{calculator.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-asphalt/10 dark:bg-asphalt/20 text-asphalt dark:text-safety-light mr-4">
                  {React.createElement(calculator.icon, { size: 24 })}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-asphalt dark:text-white">{calculator.title}</h1>
                  <p className="text-concrete-dark dark:text-gray-300">{calculator.category}</p>
                </div>
              </div>

              <p className="mb-8 text-concrete-dark dark:text-gray-300">{calculator.longDescription || calculator.description}</p>

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
      <Footer />
    </>
  );
};

export default Calculator;
