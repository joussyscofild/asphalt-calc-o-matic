
/**
 * Format URL properly for storage and display
 */
export const formatUrl = (url: string, isExternal: boolean): string => {
  // If it's an external URL, make sure it starts with http:// or https://
  if (isExternal) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  }
  
  // For custom pages
  if (url.includes('page/')) {
    // Make sure it has the correct format: /page/slug
    if (!url.startsWith('/')) {
      return `/page/${url.replace('page/', '')}`;
    } else if (!url.startsWith('/page/')) {
      return `/page/${url.substring(1).replace('page/', '')}`;
    }
  } else if (!url.startsWith('/')) {
    // For other internal URLs, ensure they start with a /
    return `/${url}`;
  }
  
  // Return URL as is if it already has the correct format
  return url;
};
