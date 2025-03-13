
import { Link } from 'react-router-dom';
import { Calculator, ChevronRight, Clock } from 'lucide-react';

export interface CalculatorCardProps {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  category: string;
  timeEstimate?: string;
  featured?: boolean;
}

const CalculatorCard = ({ id, title, description, icon, category, timeEstimate, featured }: CalculatorCardProps) => {
  return (
    <Link 
      to={`/calculator/${id}`} 
      className={`calculator-card flex flex-col h-full group ${featured ? 'border-safety/30' : ''}`}
    >
      {featured && (
        <div className="absolute top-2 right-2 bg-safety text-asphalt text-xs px-2 py-1 rounded-full">
          Featured
        </div>
      )}
      
      <div className="flex items-start mb-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-asphalt/5 text-asphalt mr-3 group-hover:bg-safety/20 group-hover:text-safety-dark transition-all duration-300">
          {icon || <Calculator size={20} />}
        </div>
        <div>
          <span className="text-xs font-semibold uppercase text-concrete">{category}</span>
          <h3 className="text-lg font-semibold text-asphalt">{title}</h3>
        </div>
      </div>
      
      <p className="text-sm text-concrete-dark flex-grow mb-4">{description}</p>
      
      <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
        {timeEstimate && (
          <div className="flex items-center text-xs text-concrete">
            <Clock size={14} className="mr-1" />
            <span>{timeEstimate}</span>
          </div>
        )}
        
        <span className="inline-flex items-center text-sm font-medium text-asphalt group-hover:text-safety-dark transition-colors">
          Use Calculator
          <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
};

export default CalculatorCard;
