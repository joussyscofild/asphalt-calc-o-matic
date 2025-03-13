
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ChevronRight, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

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
  const [isSaved, setIsSaved] = useState(() => {
    // Check if this calculator is saved in localStorage
    const savedCalculators = JSON.parse(localStorage.getItem('savedCalculators') || '[]');
    return savedCalculators.includes(id);
  });

  const toggleSaved = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the calculator page
    e.stopPropagation(); // Stop event bubbling
    
    // Get currently saved calculators
    const savedCalculators = JSON.parse(localStorage.getItem('savedCalculators') || '[]');
    
    // Toggle saved state
    if (isSaved) {
      const filtered = savedCalculators.filter((calcId: string) => calcId !== id);
      localStorage.setItem('savedCalculators', JSON.stringify(filtered));
      setIsSaved(false);
      toast({
        title: "Calculator removed",
        description: `${title} has been removed from your saved calculators.`,
      });
    } else {
      savedCalculators.push(id);
      localStorage.setItem('savedCalculators', JSON.stringify(savedCalculators));
      setIsSaved(true);
      toast({
        title: "Calculator saved",
        description: `${title} has been added to your saved calculators.`,
      });
    }
  };
  
  return (
    <Link 
      to={`/calculator/${id}`} 
      className={`calculator-card flex flex-col h-full group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-safety/30 ${featured ? 'border-safety/30' : ''}`}
    >
      {featured && (
        <div className="absolute top-2 right-2 bg-safety text-asphalt text-xs px-2 py-1 rounded-full">
          Featured
        </div>
      )}
      
      <div className="absolute top-2 left-2">
        <button 
          onClick={toggleSaved}
          className="p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors"
          aria-label={isSaved ? "Remove from saved" : "Save calculator"}
        >
          {isSaved ? (
            <BookmarkCheck size={16} className="text-safety" />
          ) : (
            <Bookmark size={16} className="text-concrete" />
          )}
        </button>
      </div>
      
      <div className="p-5">
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
      </div>
    </Link>
  );
};

export default CalculatorCard;
