
import { Navigation, Ruler, Building, TrendingUp, Landmark, LayoutGrid, Warehouse, Gauge, Truck, ChevronRight } from 'lucide-react';
import CalculatorCard from './CalculatorCard';
import { Link } from 'react-router-dom';

const FeaturedCalculators = () => {
  const featuredCalculators = [
    {
      id: 'asphalt-tonnage',
      title: 'Asphalt Tonnage Calculator',
      description: 'Calculate the exact tonnage needed for your asphalt paving project with adjustments for density and temperature.',
      icon: <Navigation size={20} />,
      category: 'Asphalt',
      timeEstimate: '1 min',
      featured: true
    },
    {
      id: 'asphalt-thickness',
      title: 'Asphalt Thickness Estimator',
      description: 'Determine the optimal asphalt thickness based on traffic load, subgrade conditions, and climate factors.',
      icon: <Ruler size={20} />,
      category: 'Asphalt',
      timeEstimate: '2 min'
    },
    {
      id: 'concrete-volume',
      title: 'Concrete Volume Calculator',
      description: 'Calculate the precise amount of concrete needed for your foundation, slab, column, or custom-shaped projects.',
      icon: <Building size={20} />,
      category: 'Concrete',
      timeEstimate: '1 min'
    },
    {
      id: 'paving-cost',
      title: 'Paving Cost Calculator',
      description: 'Estimate the total cost of your paving project including materials, labor, equipment, and other expenses.',
      icon: <TrendingUp size={20} />,
      category: 'Cost Estimation',
      timeEstimate: '3 min',
      featured: true
    },
    {
      id: 'parking-lot',
      title: 'Parking Lot Calculator',
      description: 'Plan your parking lot with precise measurements for asphalt quantity, striping, and drainage requirements.',
      icon: <LayoutGrid size={20} />,
      category: 'Specialty',
      timeEstimate: '3 min'
    },
    {
      id: 'earthwork-excavation',
      title: 'Earthwork Excavation Calculator',
      description: 'Calculate cut and fill volumes for site preparation with adjustments for soil type and compaction.',
      icon: <Truck size={20} />,
      category: 'Earthwork',
      timeEstimate: '2 min'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="section-heading">Construction Calculators</h2>
            <p className="text-concrete-dark max-w-2xl">
              Professional-grade calculators designed for precision and ease of use.
              Save time and reduce material waste with our industry-standard tools.
            </p>
          </div>
          <Link to="/calculators" className="mt-4 md:mt-0 inline-flex items-center font-medium text-asphalt hover:text-safety-dark">
            View All Calculators
            <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCalculators.map((calc) => (
            <CalculatorCard key={calc.id} {...calc} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCalculators;
