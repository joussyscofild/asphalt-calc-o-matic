
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Calculator } from '@/utils/calculatorTypes';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CalculatorSidebarProps {
  calculator: Calculator;
}

const CalculatorSidebar: React.FC<CalculatorSidebarProps> = ({
  calculator
}) => {
  return (
    <div className="rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-20 bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4 text-asphalt dark:text-white">Calculator Information</h2>
      
      {calculator.formula && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-concrete-dark dark:text-gray-300 mb-1">Formula Used:</h3>
          <div className="bg-secondary/50 dark:bg-gray-700 p-3 rounded text-asphalt dark:text-gray-300 font-mono text-sm">
            {calculator.formula}
          </div>
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-concrete-dark dark:text-gray-300 mb-1">Estimated Time:</h3>
        <p className="text-concrete-dark dark:text-gray-300">{calculator.timeEstimate}</p>
      </div>
      
      {calculator.relatedCalculators && calculator.relatedCalculators.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-concrete-dark dark:text-gray-300 mb-1">Related Calculators:</h3>
          <ul className="space-y-1">
            {calculator.relatedCalculators.map(calcId => (
              <li key={calcId}>
                <Link 
                  to={`/calculator/${calcId}`} 
                  className="text-concrete-dark dark:text-gray-300 hover:text-safety dark:hover:text-safety-light text-sm flex items-center"
                >
                  <ArrowLeft size={12} className="mr-1 text-safety" />
                  {calcId}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {calculator.externalArticles && calculator.externalArticles.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-concrete-dark dark:text-gray-300 mb-1">Related Articles:</h3>
          <ul className="space-y-3">
            {calculator.externalArticles.map((article, index) => (
              <li key={index} className="flex items-start gap-3">
                <Avatar className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                  <AvatarImage src={article.imageUrl || '/placeholder.svg'} alt={article.title} />
                  <AvatarFallback className="bg-gray-100 text-gray-400 text-xs">
                    {article.title.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <a 
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-concrete-dark dark:text-gray-300 hover:text-safety dark:hover:text-safety-light text-sm flex items-start gap-1 font-medium"
                  >
                    {article.title}
                    <ExternalLink size={12} className="flex-shrink-0 mt-0.5 text-safety" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link to="/calculators" className="btn-outline w-full text-center block">
        View All Calculators
      </Link>
    </div>
  );
};

export default CalculatorSidebar;
