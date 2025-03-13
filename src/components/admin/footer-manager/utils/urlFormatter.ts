
/**
 * Format URL properly for storage and display
 */
export const formatUrl = (url: string, isExternal: boolean): string => {
  // Handle empty URLs
  if (!url || url.trim() === '') {
    return isExternal ? 'https://example.com' : '/';
  }
  
  const trimmedUrl = url.trim();
  
  // If it's an external URL, make sure it starts with http:// or https://
  if (isExternal) {
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
      return `https://${trimmedUrl}`;
    }
    return trimmedUrl;
  }
  
  // For internal URLs
  
  // For custom pages - ensure format is /page/slug
  if (trimmedUrl.includes('page/')) {
    if (!trimmedUrl.startsWith('/')) {
      return `/page/${trimmedUrl.replace('page/', '')}`;
    } else if (!trimmedUrl.startsWith('/page/')) {
      return `/page/${trimmedUrl.substring(1).replace('page/', '')}`;
    }
    return trimmedUrl;
  } 
  
  // For other internal URLs, ensure they start with a /
  if (!trimmedUrl.startsWith('/')) {
    return `/${trimmedUrl}`;
  }
  
  // Return URL as is if it already has the correct format
  return trimmedUrl;
};
