
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';

const CalculatorNotFound: React.FC = () => {
  return (
    <div className="container-custom py-20 text-center">
      <Calculator size={48} className="mx-auto text-concrete mb-4" />
      <h1 className="text-2xl font-bold mb-4">Calculator Not Found</h1>
      <p className="mb-6">The calculator you're looking for doesn't exist or may have been moved.</p>
      <Link to="/calculators" className="btn-primary">
        Browse All Calculators
      </Link>
    </div>
  );
};

export default CalculatorNotFound;
