
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const FooterNewsletter = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Subscribe logic would go here
    console.log('Subscribing email:', email);
    setEmail('');
    // Show a success message (could use toast)
  };

  return (
    <div className="col-span-1">
      <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
      <p className="text-gray-400 text-sm mb-4">
        Subscribe to get the latest updates on new calculators and industry insights.
      </p>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className="input-field text-asphalt flex-grow bg-gray-800 text-white border-0 focus:ring-1 focus:ring-safety-light"
        />
        <button 
          type="submit"
          className="bg-safety text-asphalt px-3 py-2 rounded-r-md ml-0 hover:bg-safety-dark transition-colors"
          aria-label="Subscribe"
        >
          <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
};

export default FooterNewsletter;
