
import React from 'react';
import { Link } from 'react-router-dom';

interface FooterBottomProps {
  currentYear: number;
}

const FooterBottom: React.FC<FooterBottomProps> = ({ currentYear }) => {
  return (
    <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-500 text-sm">
        © {currentYear} asphaltcalculator.co. All rights reserved.
      </p>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <Link to="/page/privacy" className="text-gray-500 text-sm hover:text-gray-400">
          Privacy Policy
        </Link>
        <Link to="/page/terms" className="text-gray-500 text-sm hover:text-gray-400">
          Terms of Service
        </Link>
      </div>
    </div>
  );
};

export default FooterBottom;
