
export interface SiteSettings {
  siteLogo: string;
  siteTitle: string;
  siteTagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  headerLayout: string;
  footerLayout: string;
  headingFont?: string;
  bodyFont?: string;
  baseFontSize?: number;
  lineHeight?: number;
  favicon?: string;
}

export const defaultSettings: SiteSettings = {
  siteLogo: '/placeholder.svg',
  siteTitle: 'Construction Calculators',
  siteTagline: 'Calculate with Confidence',
  primaryColor: '#2563eb',
  secondaryColor: '#f97316',
  accentColor: '#10b981',
  headerLayout: 'standard',
  footerLayout: 'standard',
  headingFont: 'inter',
  bodyFont: 'roboto',
  baseFontSize: 16,
  lineHeight: 1.5,
  favicon: '/favicon.ico'
};
