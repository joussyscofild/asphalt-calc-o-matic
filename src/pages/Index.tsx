
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Hero from '@/components/Hero';
import FeaturedCalculators from '@/components/FeaturedCalculators';
import BlogPostList from '@/components/BlogPostList';
import { BlogPost } from '@/utils/blogPosts';
import { fetchWordPressPosts, navigateToBlog } from '@/utils/wordpressBlogService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Check, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  
  useEffect(() => {
    // Load recent posts from WordPress blog
    const loadRecentPosts = async () => {
      setIsLoadingPosts(true);
      try {
        const posts = await fetchWordPressPosts(3);
        setRecentPosts(posts);
      } catch (error) {
        console.error("Error loading recent posts:", error);
        toast.error("Failed to load recent blog posts");
      } finally {
        setIsLoadingPosts(false);
      }
    };
    
    loadRecentPosts();
    
    // For SEO, set page title and meta description
    document.title = 'asphaltcalculator.co - Construction Calculators & Guides';
    
    // We would add meta description here in production (not currently possible in React without helmet)
  }, []);
  
  const handleReadOurGuides = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = 'https://blog.asphaltcalculator.co';
  };
  
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-16 dark:bg-gray-900">
        {/* Hero Section */}
        <Hero />
        
        {/* Featured Calculators Section */}
        <FeaturedCalculators />
        
        {/* How It Works Section */}
        <section className="py-16 dark:bg-gray-900">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-heading">How Our Calculators Work</h2>
              <p className="text-concrete-dark dark:text-gray-300 max-w-2xl mx-auto">
                Accurate results in minutes with our industry-standard calculation methods.
                No more guesswork or complicated spreadsheets.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-md dark:hover:bg-gray-800">
                <div className="w-16 h-16 rounded-full bg-safety/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-safety-dark dark:text-safety-light">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">Choose Your Calculator</h3>
                <p className="text-concrete-dark dark:text-gray-300">
                  Select from over 30 specialized calculators designed for specific construction tasks and materials.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-md dark:hover:bg-gray-800">
                <div className="w-16 h-16 rounded-full bg-safety/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-safety-dark dark:text-safety-light">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">Enter Project Details</h3>
                <p className="text-concrete-dark dark:text-gray-300">
                  Input your project measurements and specifications in your preferred units.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-md dark:hover:bg-gray-800">
                <div className="w-16 h-16 rounded-full bg-safety/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-safety-dark dark:text-safety-light">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">Get Precise Results</h3>
                <p className="text-concrete-dark dark:text-gray-300">
                  Receive detailed calculations with the option to save, print, or download for your records.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Blog Posts - Now fetching from WordPress */}
        <BlogPostList 
          title="Latest Construction Insights" 
          description="Expert knowledge and practical advice to help you make informed decisions for your construction projects."
          posts={recentPosts}
          isLoading={isLoadingPosts}
        />
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-asphalt to-asphalt-light text-white dark:from-gray-800 dark:to-gray-700">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Calculate Your Next Project?</h2>
                <p className="text-gray-300 mb-6 max-w-lg">
                  Our construction calculators help you plan better, reduce waste, and save time.
                  Over 50,000 professionals trust asphaltcalculator.co for accurate estimates.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/calculators" className="bg-safety text-asphalt font-medium py-3 px-6 rounded-md hover:bg-safety-dark transition-colors inline-flex items-center justify-center">
                    Get Started Now
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                  <a 
                    href="https://blog.asphaltcalculator.co"
                    className="border border-white text-white font-medium py-3 px-6 rounded-md hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                    onClick={handleReadOurGuides}
                  >
                    Read Our Guides
                    <ArrowUpRight size={18} className="ml-2" />
                  </a>
                </div>
              </div>
              
              <div className="lg:w-5/12">
                <div className="bg-asphalt-light p-6 rounded-xl border border-gray-700 dark:bg-gray-700 dark:border-gray-600">
                  <h3 className="text-xl font-bold mb-4">Why Construction Professionals Choose Us</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check size={20} className="text-safety mr-2 flex-shrink-0 mt-0.5" />
                      <span>Industry-standard calculation methods for reliable results</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-safety mr-2 flex-shrink-0 mt-0.5" />
                      <span>Unit conversions between imperial and metric systems</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-safety mr-2 flex-shrink-0 mt-0.5" />
                      <span>Save, print, and download your calculations</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-safety mr-2 flex-shrink-0 mt-0.5" />
                      <span>Educational blog with technical insights and best practices</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-safety mr-2 flex-shrink-0 mt-0.5" />
                      <span>Continuously updated with the latest industry standards</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
