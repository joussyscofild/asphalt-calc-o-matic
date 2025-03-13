
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calculator } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CalculatorCard from '@/components/CalculatorCard';
import { categories } from '@/utils/calculatorCategories';
import { fetchCalculators } from '@/utils/calculatorService';
import { Calculator as CalculatorType } from '@/utils/calculatorTypes';

const Calculators = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [calculators, setCalculators] = useState<CalculatorType[]>([]);
  const [filteredCalculators, setFilteredCalculators] = useState<CalculatorType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load calculators from Supabase
  useEffect(() => {
    const loadCalculators = async () => {
      setIsLoading(true);
      try {
        // For SEO, set page title
        document.title = 'Construction Calculators | asphaltcalculator.co';
        
        const loadedCalculators = await fetchCalculators();
        setCalculators(loadedCalculators);
        setFilteredCalculators(loadedCalculators);
      } catch (error) {
        console.error("Error loading calculators:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCalculators();
  }, []);
  
  // Filter calculators based on search query and category
  useEffect(() => {
    const filtered = calculators.filter(calc => {
      const matchesSearch = 
        calc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        calc.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory 
        ? calc.category.toLowerCase() === selectedCategory.toLowerCase()
        : true;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredCalculators(filtered);
  }, [searchQuery, selectedCategory, calculators]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };
  
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(prevCategory => 
      prevCategory === categoryId ? null : categoryId
    );
  };
  
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-20 pb-16">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-10 md:mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-asphalt">Construction Calculators</h1>
            <p className="text-concrete-dark max-w-2xl mx-auto">
              Professional-grade calculators designed for precision in asphalt, concrete, 
              and general construction projects. Save time and reduce material waste.
            </p>
          </div>
          
          {/* Search & Filter */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 gap-4">
              <form onSubmit={handleSearch} className="flex-grow">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search calculators..."
                    className="input-field pr-10 w-full"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-concrete" size={18} />
                </div>
              </form>
              
              <div className="flex items-center">
                <span className="text-concrete mr-3 flex items-center">
                  <Filter size={18} className="mr-1" />
                  Filter:
                </span>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-asphalt text-white'
                          : 'bg-gray-100 text-concrete-dark hover:bg-gray-200'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Calculators Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-64 rounded-lg bg-white border border-gray-200 animate-pulse"></div>
              ))}
            </div>
          ) : filteredCalculators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCalculators.map(calc => (
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
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-asphalt mb-2">No calculators found</h3>
              <p className="text-concrete-dark mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="text-safety-dark hover:text-safety hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Calculators;
