// types.ts
export interface ScrapedPage {
    id: string
    url: string
    status: 'detected' | 'scraping' | 'completed' | 'failed'
    lastUpdated: Date
    chunks: string[]
    metaDescription?: string
    title?: string
    pageViews?: number
    avgTimeOnPage?: number
    bounceRate?: string
  }
  
  // sampleData.ts
  export const sampleScrapedPages: ScrapedPage[] = [
    {
      id: '1',
      url: 'https://example.com',
      status: 'completed',
      lastUpdated: new Date('2024-01-28'),
      metaDescription: 'Main website for Example Corp - Leading software solutions',
      title: 'Example Corp - Home',
      chunks: [
        'Example Corp provides innovative software solutions for enterprise businesses.',
        'Our team of experts specializes in AI-powered automation and digital transformation.',
        'Founded in 2010, we have helped over 500 companies modernize their operations.'
      ]
    },
    {
      id: '2',
      url: 'https://example.com/about',
      status: 'completed',
      lastUpdated: new Date('2024-01-28'),
      metaDescription: 'Learn about Example Corp\'s mission and team',
      title: 'About Us - Example Corp',
      chunks: [
        'Our mission is to simplify complex business processes through intelligent automation.',
        'The leadership team brings over 50 years of combined experience in software development.',
        'We maintain offices in New York, London, and Singapore to serve our global client base.'
      ]
    },
    {
      id: '3',
      url: 'https://example.com/products',
      status: 'completed',
      lastUpdated: new Date('2024-01-28'),
      metaDescription: 'Explore Example Corp\'s product suite',
      title: 'Products - Example Corp',
      chunks: [
        'AutomateAI - Our flagship product for business process automation',
        'DataSync - Enterprise data integration platform',
        'CloudGuard - Comprehensive cloud security solution'
      ]
    },
    {
      id: '4',
      url: 'https://example.com/blog/ai-trends-2024',
      status: 'detected',
      lastUpdated: new Date('2024-01-28'),
      title: 'AI Trends 2024',
      chunks: []
    },
    {
      id: '5',
      url: 'https://example.com/blog/case-studies',
      status: 'detected',
      lastUpdated: new Date('2024-01-28'),
      title: 'Customer Success Stories',
      chunks: []
    },
    {
      id: '6',
      url: 'https://example.com/contact',
      status: 'detected',
      lastUpdated: new Date('2024-01-28'),
      title: 'Contact Us',
      chunks: []
    },
    {
      id: '7',
      url: 'https://example.com/careers',
      status: 'detected',
      lastUpdated: new Date('2024-01-28'),
      title: 'Join Our Team',
      chunks: []
    },
    {
      id: '8',
      url: 'https://example.com/pricing',
      status: 'detected',
      lastUpdated: new Date('2024-01-28'),
      title: 'Pricing Plans',
      chunks: []
    },
    {
      id: '9',
      url: 'https://example.com/support',
      status: 'scraping',
      lastUpdated: new Date('2024-01-28'),
      title: 'Customer Support',
      chunks: []
    },
    {
      id: '10',
      url: 'https://example.com/api-docs',
      status: 'scraping',
      lastUpdated: new Date('2024-01-28'),
      title: 'API Documentation',
      chunks: []
    }
  ]
  
  // Firestore collection structure
  /*
  organizations/
    - companyName: string
    - websiteUrl: string
    - description: string
    - createdAt: timestamp
    - updatedAt: timestamp
    - status: 'setup' | 'training' | 'complete'
    - metaDescription?: string
  
  scrapedPages/
    - url: string
    - status: 'detected' | 'scraping' | 'completed' | 'failed'
    - lastUpdated: timestamp
    - metaDescription?: string
    - title?: string
    - chunks: string[]
    - organizationId: string (reference to organizations collection)
  */