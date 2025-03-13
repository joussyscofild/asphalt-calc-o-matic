
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader2 className="h-8 w-8 animate-spin mb-4" />
      <p>Loading footer links...</p>
    </div>
  );
};

export default LoadingState;
