
import React from 'react';
import { Link } from 'react-router-dom';
import { useSocialLinks } from './useSocialLinks';
import { Loader2 } from 'lucide-react';

const FooterBrand = () => {
  const { socialLinks, isLoading } = useSocialLinks();
  
  return (
    <div className="col-span-1 md:col-span-1">
      <Link to="/" className="flex items-center space-x-1 text-white font-merriweather font-bold text-xl mb-4">
        <span className="text-safety">asphalt</span>
        calculator.co
      </Link>
      <p className="text-gray-400 text-sm mb-4">
        The leading resource for asphalt and construction calculators, trusted by professionals worldwide.
      </p>
      <div className="flex space-x-4">
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        ) : socialLinks.length > 0 ? (
          socialLinks.map((link) => (
            <a 
              key={link.id}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-safety transition-colors"
              aria-label={link.label}
            >
              <span dangerouslySetInnerHTML={{ __html: link.icon }} />
            </a>
          ))
        ) : (
          <>
            <a href="#" className="text-gray-400 hover:text-safety transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-safety transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-safety transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
              </svg>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default FooterBrand;
