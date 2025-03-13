
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calculator } from 'lucide-react';
import CalculatorCard from './CalculatorCard';
import { fetchCalculators } from '@/utils/calculatorService';
import { Calculator as CalculatorType } from '@/utils/calculatorTypes';

const FeaturedCalculators = () => {
  const [calculators, setCalculators] = useState<CalculatorType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCalculators = async () => {
      try {
        const allCalculators = await fetchCalculators();
        // Filter to get featured calculators or just show the first 6
        const featuredCalcs = allCalculators.filter(calc => calc.featured);
        const calcsToShow = featuredCalcs.length >= 3 ? 
          featuredCalcs.slice(0, 6) : 
          allCalculators.slice(0, 6);
        
        setCalculators(calcsToShow);
      } catch (error) {
        console.error("Error loading calculators:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCalculators();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="section-heading mb-3">Professional Construction Calculators</h2>
            <p className="text-concrete-dark max-w-2xl">
              Our professional-grade calculators are designed for precision and ease of use.
              Save time, reduce material waste, and improve cost estimates with our industry-standard tools.
            </p>
          </div>
          <Link to="/calculators" className="mt-4 md:mt-0 inline-flex items-center font-medium text-asphalt hover:text-safety-dark transition-colors group">
            View All Calculators
            <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-64 rounded-lg bg-white border border-gray-200 animate-pulse"></div>
            ))}
          </div>
        ) : calculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc) => (
              <CalculatorCard 
                key={calc.id}
                id={calc.id}
                title={calc.title}
                description={calc.description}
                icon={<calc.icon size={20} />}
                category={calc.category}
                timeEstimate={calc.timeEstimate}
                featured={calc.featured}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Calculator className="h-12 w-12 mx-auto text-concrete mb-4" />
            <h3 className="text-xl font-semibold">No Calculators Available</h3>
            <p className="text-concrete-dark mt-2">
              Please check back later for our professional construction calculators.
            </p>
          </div>
        )}
        
        <div className="mt-10 text-center">
          <p className="text-concrete-dark mb-4">
            Can't find what you're looking for? We're constantly adding new calculators.
          </p>
          <Link to="/calculators" className="btn-outline">
            Explore All Calculators
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCalculators;
