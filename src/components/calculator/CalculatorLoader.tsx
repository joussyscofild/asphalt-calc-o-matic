
import React from 'react';
import { Calculator } from 'lucide-react';

const CalculatorLoader: React.FC = () => {
  return (
    <div className="container-custom py-12 text-center">
      <Calculator size={48} className="mx-auto animate-spin text-muted-foreground mb-4" />
      <p>Loading calculator...</p>
    </div>
  );
};

export default CalculatorLoader;
