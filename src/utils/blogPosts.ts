import { supabase } from '@/integrations/supabase/client';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar?: string;
  date: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  featured?: boolean;
  readTime?: string;
  status: 'published' | 'draft';
}

export const blogCategories = [
  { id: 'asphalt-guides', name: 'Asphalt Paving Guides' },
  { id: 'construction-materials', name: 'Construction Materials 101' },
  { id: 'project-planning', name: 'Project Planning' },
  { id: 'industry-trends', name: 'Industry Trends' },
  { id: 'diy-tips', name: 'DIY Tips & Tricks' }
];

// Default blog posts - only used when no posts exist in Supabase
export const defaultBlogPosts: BlogPost[] = [
  {
    id: 'understanding-asphalt-density',
    title: 'Understanding Asphalt Density: The Key to Durable Pavements',
    excerpt: 'Learn how proper asphalt density affects the longevity and performance of your paving project, and why it matters for your calculations.',
    content: `<h1>Understanding Asphalt Density</h1>
<p>Asphalt density is a critical factor in determining the durability and performance of paved surfaces. When asphalt is properly compacted, it creates a dense, stable surface that can withstand heavy traffic and environmental stresses.</p>
<h2>Why Density Matters</h2>
<p>Higher density in asphalt pavement means:</p>
<ul>
  <li>Greater load-bearing capacity</li>
  <li>Reduced water penetration</li>
  <li>Better resistance to rutting and deformation</li>
  <li>Longer pavement life</li>
</ul>
<h2>Measuring Asphalt Density</h2>
<p>Density is typically measured as a percentage of the theoretical maximum density (TMD). Most specifications require a compaction level between 92% and 97% of TMD.</p>
<p>Modern testing methods include nuclear density gauges and non-nuclear electromagnetic devices that provide quick, accurate measurements in the field.</p>
<h2>Factors Affecting Compaction</h2>
<p>Several factors influence how well asphalt can be compacted:</p>
<ol>
  <li>Mix temperature - hotter mixes compact more easily</li>
  <li>Aggregate properties and gradation</li>
  <li>Binder content and type</li>
  <li>Layer thickness</li>
  <li>Weather conditions during placement</li>
</ol>
<h2>Best Practices for Achieving Optimal Density</h2>
<p>To achieve the best results in asphalt compaction:</p>
<ul>
  <li>Maintain proper mix temperature during transport and placement</li>
  <li>Use appropriate compaction equipment in the correct sequence</li>
  <li>Follow the rolling pattern recommended for your specific mix</li>
  <li>Monitor density throughout the compaction process</li>
  <li>Adjust techniques based on environmental conditions</li>
</ul>
<p>By understanding and controlling asphalt density, contractors can deliver high-quality pavements that perform well and last longer, ultimately providing better value for clients and road users.</p>`,
    author: 'John Anderson',
    authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: 'June 15, 2023',
    category: 'Asphalt Paving Guides',
    tags: ['Asphalt Density', 'Material Properties', 'Paving Durability'],
    imageUrl: 'https://images.unsplash.com/photo-1518962634205-830d3ccb1b92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    readTime: '5 min read',
    status: 'published'
  },
  {
    id: 'choosing-right-concrete-mix',
    title: 'How to Choose the Right Concrete Mix for Your Project',
    excerpt: 'A comprehensive guide to selecting the appropriate concrete mix based on project requirements, strength needs, and environmental conditions.',
    content: `<h1>Choosing the Right Concrete Mix</h1>
<p>Selecting the appropriate concrete mix is essential for ensuring your project's durability, strength, and overall success. Different applications require different concrete properties.</p>
<h2>Understanding Concrete Mix Components</h2>
<p>All concrete consists of:</p>
<ul>
  <li>Cement - the binding agent</li>
  <li>Aggregates - sand and gravel that provide volume and strength</li>
  <li>Water - activates the cement</li>
  <li>Admixtures - special additives that modify properties (optional)</li>
</ul>
<h2>Common Concrete Strength Classes</h2>
<p>Concrete strength is measured in pounds per square inch (psi) or megapascals (MPa) at 28 days of curing:</p>
<ul>
  <li><strong>2500-3000 psi (17-21 MPa)</strong>: General residential applications (sidewalks, driveways)</li>
  <li><strong>3500-4500 psi (24-31 MPa)</strong>: Structural applications (foundations, walls)</li>
  <li><strong>5000+ psi (34+ MPa)</strong>: Heavy-duty commercial applications</li>
</ul>
<h2>Environmental Considerations</h2>
<p>Your local climate affects which mix is appropriate:</p>
<ul>
  <li><strong>Cold climates</strong>: Air-entrained concrete with freeze-thaw resistance</li>
  <li><strong>Hot climates</strong>: Mixes with slower setting times</li>
  <li><strong>Marine environments</strong>: Sulfate-resistant mixes</li>
</ul>
<h2>Specialty Concrete Types</h2>
<p>For specific applications, consider:</p>
<ul>
  <li><strong>High-strength concrete</strong>: For structural elements bearing heavy loads</li>
  <li><strong>Pervious concrete</strong>: Allows water to pass through, reducing runoff</li>
  <li><strong>Self-consolidating concrete</strong>: Flows easily into complex forms</li>
  <li><strong>Fiber-reinforced concrete</strong>: Contains fibers for crack resistance</li>
</ul>
<h2>Making the Final Selection</h2>
<p>When choosing your mix, consider:</p>
<ol>
  <li>Required strength specifications</li>
  <li>Exposure conditions</li>
  <li>Placement method and access</li>
  <li>Finishing requirements</li>
  <li>Curing conditions</li>
</ol>
<p>Consulting with a concrete supplier or structural engineer can help ensure you select the right mix for your specific project needs.</p>`,
    author: 'Michael Torres',
    authorAvatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    date: 'May 28, 2023',
    category: 'Construction Materials 101',
    tags: ['Concrete Mix', 'Material Selection', 'Construction Basics'],
    imageUrl: 'https://images.unsplash.com/photo-1578053373574-177685692edf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    readTime: '6 min read',
    status: 'published'
  },
  {
    id: 'asphalt-vs-concrete-driveways',
    title: 'Asphalt vs. Concrete Driveways: A Cost and Durability Comparison',
    excerpt: 'Compare the pros and cons of asphalt and concrete driveways, including initial costs, maintenance requirements, and long-term value.',
    content: `<h1>Asphalt vs. Concrete Driveways</h1>
<p>Choosing between asphalt and concrete for your driveway is a significant decision that affects your property's appearance, maintenance needs, and budget for years to come.</p>
<h2>Initial Cost Comparison</h2>
<p>When comparing upfront expenses:</p>
<ul>
  <li><strong>Asphalt</strong>: $2-$5 per square foot</li>
  <li><strong>Concrete</strong>: $4-$8 per square foot</li>
</ul>
<p>Asphalt is typically less expensive initially, with savings of 30-40% compared to concrete.</p>
<h2>Lifespan and Durability</h2>
<p>Each material offers different longevity:</p>
<ul>
  <li><strong>Asphalt</strong>: 15-20 years with proper maintenance</li>
  <li><strong>Concrete</strong>: 25-30+ years with proper maintenance</li>
</ul>
<h2>Climate Considerations</h2>
<p>Your local weather affects performance:</p>
<ul>
  <li><strong>Cold climates</strong>: Asphalt handles freeze-thaw cycles better but may require more maintenance</li>
  <li><strong>Hot climates</strong>: Concrete stays cooler but may develop cracks, while asphalt can soften</li>
</ul>
<h2>Maintenance Requirements</h2>
<p><strong>Asphalt Maintenance:</strong></p>
<ul>
  <li>Sealcoating every 2-3 years ($0.15-$0.25 per sq ft)</li>
  <li>Crack filling as needed</li>
  <li>Potential resurfacing after 10-15 years</li>
</ul>
<p><strong>Concrete Maintenance:</strong></p>
<ul>
  <li>Sealing every 2-5 years</li>
  <li>Degreasing as needed</li>
  <li>Crack repairs (less frequent but often more expensive)</li>
</ul>
<h2>Appearance and Customization</h2>
<ul>
  <li><strong>Asphalt</strong>: Limited to black; can be stamped but options are limited</li>
  <li><strong>Concrete</strong>: Many finishing options including stamping, staining, exposed aggregate, and integral coloring</li>
</ul>
<h2>Long-Term Cost Analysis</h2>
<p>When factoring in installation, maintenance, and replacement over 30 years:</p>
<ul>
  <li><strong>Asphalt</strong>: Higher long-term cost due to more frequent maintenance and shorter lifespan</li>
  <li><strong>Concrete</strong>: Lower long-term cost despite higher initial investment</li>
</ul>
<p>Your choice ultimately depends on your budget, climate, aesthetic preferences, and how long you plan to stay in your home.</p>`,
    author: 'Sarah Johnson',
    authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: 'April 12, 2023',
    category: 'Project Planning',
    tags: ['Driveways', 'Cost Comparison', 'Asphalt', 'Concrete'],
    imageUrl: 'https://images.unsplash.com/photo-1617108029561-d5e7825f2851?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    readTime: '7 min read',
    status: 'published'
  },
  {
    id: 'minimizing-material-waste',
    title: '5 Strategies to Minimize Material Waste on Construction Sites',
    excerpt: 'Practical tips for reducing waste, improving efficiency, and saving money on your construction projects through better material management.',
    content: `<h1>Minimizing Material Waste on Construction Sites</h1>
<p>Construction waste accounts for approximately 30% of all waste in landfills. Implementing effective waste reduction strategies not only helps the environment but also improves your bottom line.</p>
<h2>1. Accurate Quantity Takeoffs</h2>
<p>The foundation of waste reduction starts with precise estimation:</p>
<ul>
  <li>Use digital takeoff software for greater accuracy</li>
  <li>Include appropriate waste factors based on material type and application</li>
  <li>Review historical data from similar projects to refine estimates</li>
</ul>
<p>Investing time in accurate takeoffs can reduce over-ordering by 10-15%.</p>
<h2>2. Just-in-Time Delivery Scheduling</h2>
<p>Coordinate deliveries to minimize on-site storage time:</p>
<ul>
  <li>Schedule deliveries to arrive shortly before materials are needed</li>
  <li>Break large orders into multiple deliveries when possible</li>
  <li>Create detailed delivery schedules synchronized with construction phases</li>
</ul>
<p>This approach reduces damage from handling, weather exposure, and theft.</p>
<h2>3. Proper Material Storage and Handling</h2>
<p>Protect materials once they arrive on site:</p>
<ul>
  <li>Store materials on pallets or dunnage to keep them off the ground</li>
  <li>Use appropriate coverings to protect from sun, rain, and other elements</li>
  <li>Label storage areas clearly and organize by use date</li>
  <li>Train workers on proper material handling techniques</li>
</ul>
<h2>4. Prefabrication and Modular Construction</h2>
<p>Factory-built components generate less waste:</p>
<ul>
  <li>Prefabricated trusses, wall panels, and other components</li>
  <li>Modular construction methods</li>
  <li>Pre-cut materials when possible</li>
</ul>
<p>Prefabrication can reduce waste by up to 90% for specific building elements.</p>
<h2>5. On-Site Sorting and Recycling</h2>
<p>Implement a comprehensive waste management plan:</p>
<ul>
  <li>Set up separate bins for different material types</li>
  <li>Train all workers on proper sorting procedures</li>
  <li>Partner with recycling facilities for wood, concrete, metal, and drywall</li>
  <li>Consider on-site crushing of concrete for reuse as base material</li>
</ul>
<p>Proper sorting can divert 50-90% of construction waste from landfills.</p>
<h2>Measuring Success</h2>
<p>Track your waste reduction progress:</p>
<ul>
  <li>Calculate waste percentage (waste weight divided by total materials)</li>
  <li>Compare to industry benchmarks (typically 10-15%)</li>
  <li>Document cost savings from reduced material purchases and disposal fees</li>
</ul>
<p>Implementing these strategies can reduce overall material costs by 5-10% while significantly reducing your project's environmental impact.</p>`,
    author: 'David Chen',
    authorAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    date: 'March 5, 2023',
    category: 'Project Planning',
    tags: ['Waste Reduction', 'Cost Saving', 'Sustainability'],
    imageUrl: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    readTime: '4 min read',
    status: 'published'
  },
  {
    id: 'parking-lot-design-tips',
    title: 'Essential Parking Lot Design Tips for Maximum Efficiency',
    excerpt: 'Learn how to design efficient, compliant parking lots that maximize space utilization while ensuring proper drainage and traffic flow.',
    content: `<h1>Parking Lot Design Tips for Maximum Efficiency</h1>
<p>A well-designed parking lot does more than just provide spaces for vehicles—it optimizes traffic flow, enhances safety, and contributes to the overall aesthetic and functionality of a property.</p>
<h2>Space Optimization Strategies</h2>
<p>Maximize the number of parking spaces while maintaining usability:</p>
<ul>
  <li><strong>Standard parking space dimensions</strong>: 9' × 18' for standard spaces</li>
  <li><strong>Aisle width</strong>: 24' for two-way traffic, 18' for one-way</li>
  <li><strong>Angled parking</strong>: Consider 45° or 60° angles to increase capacity in constrained areas</li>
  <li><strong>Compact spaces</strong>: Designate 8' × 16' spaces for smaller vehicles (up to 20% of total spaces)</li>
</ul>
<h2>Traffic Flow Considerations</h2>
<p>Design for smooth movement throughout the parking area:</p>
<ul>
  <li>Create one-way circulation patterns where possible</li>
  <li>Separate entry and exit points to reduce congestion</li>
  <li>Maintain adequate throat length at entrances (min. 40' from property line)</li>
  <li>Design turning radii appropriate for expected vehicle types</li>
</ul>
<h2>ADA Compliance Requirements</h2>
<p>Follow accessibility guidelines:</p>
<ul>
  <li>Provide accessible spaces according to total parking count (1:25 ratio minimum)</li>
  <li>Design van-accessible spaces (1:6 of all accessible spaces)</li>
  <li>Ensure 5' access aisles adjacent to accessible spaces</li>
  <li>Locate accessible spaces nearest to building entrances</li>
  <li>Provide a clear path to building entrances without crossing traffic lanes</li>
</ul>
<h2>Drainage and Stormwater Management</h2>
<p>Properly manage water runoff:</p>
<ul>
  <li>Design with 1-2% minimum slope for adequate drainage</li>
  <li>Direct water to bioswales, rain gardens, or detention basins</li>
  <li>Consider permeable pavement in low-traffic areas</li>
  <li>Install oil/water separators before discharge points</li>
</ul>
<h2>Lighting and Security</h2>
<p>Create a safe environment:</p>
<ul>
  <li>Provide minimum 1 foot-candle illumination throughout</li>
  <li>Increase to 3-5 foot-candles at entrances and pedestrian pathways</li>
  <li>Use LED fixtures for energy efficiency and better color rendering</li>
  <li>Ensure uniform lighting without dark spots</li>
</ul>
<h2>Landscaping Integration</h2>
<p>Incorporate green elements:</p>
<ul>
  <li>Include shade trees to reduce heat island effect</li>
  <li>Use landscaped islands to break up large paved areas</li>
  <li>Select salt-tolerant plants in cold climates</li>
  <li>Incorporate low-maintenance native species</li>
</ul>
<p>By carefully considering these design elements, you can create a parking lot that not only meets code requirements but also enhances the overall property value and user experience.</p>`,
    author: 'Robert Williams',
    authorAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    date: 'February 18, 2023',
    category: 'Project Planning',
    tags: ['Parking Lot', 'Design', 'Space Utilization'],
    imageUrl: 'https://images.unsplash.com/photo-1545364477-c76935cd61f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    readTime: '5 min read',
    status: 'published'
  },
  {
    id: 'sustainable-paving-practices',
    title: 'Sustainable Paving Practices for Environmental Compliance',
    excerpt: 'Discover eco-friendly paving methods and materials that meet regulatory requirements while reducing environmental impact.',
    content: `<h1>Sustainable Paving Practices</h1>
<p>As environmental regulations become more stringent and clients increasingly value sustainability, incorporating eco-friendly paving practices is becoming essential for construction professionals.</p>
<h2>Permeable Pavement Systems</h2>
<p>Permeable pavements allow stormwater to infiltrate through the surface:</p>
<ul>
  <li><strong>Pervious concrete</strong>: Contains minimal fine aggregates, creating void spaces</li>
  <li><strong>Porous asphalt</strong>: Similar to standard asphalt but with reduced fines</li>
  <li><strong>Permeable interlocking pavers</strong>: Concrete pavers with spacers and drainage aggregate</li>
</ul>
<p>Benefits include reduced runoff, natural water filtering, and groundwater recharge.</p>
<h2>Recycled Material Integration</h2>
<p>Incorporating recycled materials reduces virgin resource consumption:</p>
<ul>
  <li><strong>Reclaimed asphalt pavement (RAP)</strong>: Can comprise 10-30% of new mixes</li>
  <li><strong>Recycled concrete aggregate (RCA)</strong>: Used in base layers and some surface applications</li>
  <li><strong>Recycled plastic additives</strong>: Improve durability while reducing plastic waste</li>
  <li><strong>Glass cullet</strong>: Can replace portion of fine aggregates</li>
</ul>
<h2>Cool Pavement Technologies</h2>
<p>Reduce heat island effect with reflective surfaces:</p>
<ul>
  <li>High-albedo concrete mixes</li>
  <li>Light-colored aggregate surfacing</li>
  <li>Reflective coatings and sealers</li>
</ul>
<p>These can reduce surface temperatures by 20-40°F compared to traditional dark pavements.</p>
<h2>Low-Emission Installation Methods</h2>
<p>Reduce construction-phase emissions:</p>
<ul>
  <li><strong>Warm-mix asphalt</strong>: Produced at lower temperatures (50-100°F cooler than hot mix)</li>
  <li><strong>Cold-in-place recycling</strong>: Reuses existing pavement without heating</li>
  <li><strong>Electric and low-emission equipment</strong>: Reduces carbon footprint during installation</li>
</ul>
<h2>Bioretention Integration</h2>
<p>Combine paving with green infrastructure:</p>
<ul>
  <li>Bioswales along parking areas and roadways</li>
  <li>Tree wells and planting areas integrated with paved surfaces</li>
  <li>Disconnected downspouts directing roof runoff to landscaped areas</li>
</ul>
<h2>Regulatory Compliance Benefits</h2>
<p>Sustainable practices help meet various requirements:</p>
<ul>
  <li>NPDES permit compliance for stormwater management</li>
  <li>Municipal MS4 requirements</li>
  <li>LEED and other green building certification points</li>
  <li>Environmental impact statement (EIS) mitigation measures</li>
</ul>
<p>By incorporating these sustainable paving practices, contractors can achieve compliance while delivering more environmentally responsible projects that perform well over their lifecycle.</p>`,
    author: 'Emma Rodriguez',
    authorAvatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    date: 'January 9, 2023',
    category: 'Industry Trends',
    tags: ['Sustainability', 'Environmental Compliance', 'Green Building'],
    imageUrl: 'https://images.unsplash.com/photo-1553708881-112abc53fe54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    readTime: '6 min read',
    status: 'published'
  }
];

// Initialize the posts array - this will be populated from Supabase
export const blogPosts: BlogPost[] = [];

// Fetch posts from Supabase
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*');
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      return [...defaultBlogPosts]; // Fall back to default posts on error
    }
    
    if (data && data.length > 0) {
      // Map Supabase data format to our BlogPost format
      const posts = data.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        authorAvatar: post.author_avatar,
        date: post.date,
        category: post.category,
        tags: post.tags || [],
        imageUrl: post.image_url,
        featured: post.featured,
        readTime: post.read_time,
        status: post.status
      }));
      
      // Update the blogPosts array
      blogPosts.length = 0;
      blogPosts.push(...posts);
      return posts;
    } else {
      // If no posts in Supabase yet, use default posts and add them to Supabase
      for (const post of defaultBlogPosts) {
        await addBlogPostToSupabase(post);
      }
      blogPosts.length = 0;
      blogPosts.push(...defaultBlogPosts);
      return [...defaultBlogPosts];
    }
  } catch (error) {
    console.error('Error in fetchBlogPosts:', error);
    return [...defaultBlogPosts];
  }
};

// Add a blog post to Supabase
export const addBlogPostToSupabase = async (post: BlogPost): Promise<void> => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .upsert({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        author_avatar: post.authorAvatar,
        date: post.date,
        category: post.category,
        tags: post.tags,
        image_url: post.imageUrl,
        featured: post.featured,
        read_time: post.readTime,
        status: post.status
      });
    
    if (error) {
      console.error('Error adding blog post to Supabase:', error);
    }
  } catch (error) {
    console.error('Error in addBlogPostToSupabase:', error);
  }
};

// Delete a blog post from Supabase
export const deleteBlogPostFromSupabase = async (postId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', postId);
    
    if (error) {
      console.error('Error deleting blog post from Supabase:', error);
    }
  } catch (error) {
    console.error('Error in deleteBlogPostFromSupabase:', error);
  }
};

// Helper functions to work with blog posts
export const getRecentBlogPosts = async (count: number = 3): Promise<BlogPost[]> => {
  await fetchBlogPosts(); // Ensure we have the latest posts
  
  return [...blogPosts]
    .filter(post => post.status === 'published')
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }).slice(0, count);
};

export const getFeaturedBlogPosts = async (): Promise<BlogPost[]> => {
  await fetchBlogPosts(); // Ensure we have the latest posts
  
  return blogPosts.filter(post => post.featured && post.status === 'published');
};

export const getBlogPostById = async (id: string): Promise<BlogPost | undefined> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching blog post by ID:', error);
      // Fall back to local array search
      return blogPosts.find(post => post.id === id);
    }
    
    if (data) {
      return {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        author: data.author,
        authorAvatar: data.author_avatar,
        date: data.date,
        category: data.category,
        tags: data.tags || [],
        imageUrl: data.image_url,
        featured: data.featured,
        readTime: data.read_time,
        status: data.status
      };
    }
    
    return undefined;
  } catch (error) {
    console.error('Error in getBlogPostById:', error);
    return blogPosts.find(post => post.id === id);
  }
};

export const getBlogPostsByCategory = async (categoryId: string): Promise<BlogPost[]> => {
  await fetchBlogPosts(); // Ensure we have the latest posts
  
  return blogPosts.filter(post => {
    const normCat = post.category.toLowerCase().replace(/\s+/g, '-');
    return normCat === categoryId.toLowerCase() && post.status === 'published';
  });
};

export const getBlogPostsByTag = async (tag: string): Promise<BlogPost[]> => {
  await fetchBlogPosts(); // Ensure we have the latest posts
  
  return blogPosts.filter(post => {
    return post.tags.some(t => t.toLowerCase().replace(/\s+/g, '-') === tag.toLowerCase()) 
      && post.status === 'published';
  });
};

export const getAllPublishedPosts = async (): Promise<BlogPost[]> => {
  await fetchBlogPosts(); // Ensure we have the latest posts
  
  return blogPosts.filter(post => post.status === 'published');
};

export const getAllDraftPosts = async (): Promise<BlogPost[]> => {
  await fetchBlogPosts(); // Ensure we have the latest posts
  
  return blogPosts.filter(post => post.status === 'draft');
};
