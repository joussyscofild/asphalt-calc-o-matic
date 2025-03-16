import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Calculator } from '@/utils/calculatorTypes';
interface CalculatorSidebarProps {
  calculator: Calculator;
}
const CalculatorSidebar: React.FC<CalculatorSidebarProps> = ({
  calculator
}) => {
  return <div className="rounded-lg shadow-sm border border-gray-100 p-6 sticky top-20 bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">Calculator Information</h2>
      
      {calculator.formula && <div className="mb-4">
          <h3 className="text-sm font-medium text-asphalt mb-1">Formula Used:</h3>
          <div className="bg-gray-50 p-3 rounded text-concrete-dark font-mono text-sm">
            {calculator.formula}
          </div>
        </div>}
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-asphalt mb-1">Estimated Time:</h3>
        <p className="text-concrete-dark">{calculator.timeEstimate}</p>
      </div>
      
      {calculator.relatedCalculators && calculator.relatedCalculators.length > 0 && <div className="mb-4">
          <h3 className="text-sm font-medium text-asphalt mb-1">Related Calculators:</h3>
          <ul className="space-y-1">
            {calculator.relatedCalculators.map(calcId => {
          return <li key={calcId}>
                  <Link to={`/calculator/${calcId}`} className="text-asphalt hover:text-safety-dark text-sm flex items-center">
                    <ArrowLeft size={12} className="mr-1" />
                    {calcId}
                  </Link>
                </li>;
        })}
          </ul>
        </div>}

      <Link to="/calculators" className="btn-outline w-full text-center">
        View All Calculators
      </Link>
    </div>;
};
export default CalculatorSidebar;