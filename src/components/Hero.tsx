
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ChevronRight, Search } from 'lucide-react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality here
  };
  
  return (
    <div className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '24px',
        }} />
      </div>
      
      <div className="container-custom relative">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          {/* Hero Content */}
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-up">
            <div className="inline-block px-3 py-1 text-xs font-medium bg-safety/10 text-safety-dark rounded-full mb-4">
              The most trusted asphalt calculator suite
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-asphalt mb-4">
              Precise Calculations for Construction Professionals
            </h1>
            <p className="text-concrete-dark text-lg md:text-xl mb-8 max-w-xl">
              30+ specialized calculators designed for asphalt, concrete, and general construction projects. Built by industry experts, trusted by professionals.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <Link to="/calculators" className="btn-primary flex items-center justify-center">
                <Calculator size={18} className="mr-2" />
                Explore Calculators
              </Link>
              <Link to="/blog" className="btn-outline flex items-center justify-center">
                Learn More
                <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex items-center max-w-md rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for calculators..."
                className="input-field flex-grow rounded-none rounded-l-lg border-0"
              />
              <button 
                type="submit"
                className="bg-asphalt text-white px-4 py-2 rounded-r-lg hover:bg-asphalt-light transition-all duration-200"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>
          </div>
          
          {/* Hero Image */}
          <div className="md:w-5/12 relative animate-fade-in">
            <div className="calculator-card bg-white shadow-xl">
              <h3 className="text-xl font-bold mb-4">Asphalt Tonnage Calculator</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Length (feet)</label>
                  <input type="number" placeholder="100" className="input-field w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Width (feet)</label>
                  <input type="number" placeholder="20" className="input-field w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thickness (inches)</label>
                  <input type="number" placeholder="2" className="input-field w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit weight (lb/ft³)</label>
                  <input type="number" placeholder="145" className="input-field w-full" />
                </div>
                <button className="btn-primary w-full">Calculate Tonnage</button>
              </div>
              
              {/* Sample Result Box */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="text-sm font-semibold text-asphalt mb-1">Estimated Result:</h4>
                <p className="text-2xl font-bold text-safety-dark">24.3 tons</p>
                <p className="text-xs text-gray-500 mt-1">Based on standard asphalt density</p>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-safety/20 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-concrete/20 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
