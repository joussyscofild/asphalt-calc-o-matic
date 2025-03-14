
import { useEffect } from 'react';

const Sitemap = () => {
  useEffect(() => {
    // Redirect to the static sitemap.xml file
    window.location.href = '/sitemap.xml';
  }, []);
  
  return null;
};

export default Sitemap;
