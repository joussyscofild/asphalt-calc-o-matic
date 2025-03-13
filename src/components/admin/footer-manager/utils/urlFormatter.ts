
/**
 * Format URL properly for storage and display
 */
export const formatUrl = (url: string, isExternal: boolean): string => {
  console.log(`Formatting URL: "${url}", isExternal: ${isExternal}`);
  
  // Handle empty URLs
  if (!url || url.trim() === '') {
    const result = isExternal ? 'https://example.com' : '/';
    console.log(`Empty URL formatted to: ${result}`);
    return result;
  }
  
  const trimmedUrl = url.trim();
  
  // If it's an external URL, make sure it starts with http:// or https://
  if (isExternal) {
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
      const result = `https://${trimmedUrl}`;
      console.log(`External URL formatted from "${trimmedUrl}" to "${result}"`);
      return result;
    }
    console.log(`External URL already properly formatted: ${trimmedUrl}`);
    return trimmedUrl;
  }
  
  // For internal URLs
  
  // For custom pages - ensure format is /page/slug
  if (trimmedUrl.includes('page/')) {
    if (!trimmedUrl.startsWith('/')) {
      const result = `/page/${trimmedUrl.replace('page/', '')}`;
      console.log(`Custom page URL formatted from "${trimmedUrl}" to "${result}"`);
      return result;
    } else if (!trimmedUrl.startsWith('/page/')) {
      const result = `/page/${trimmedUrl.substring(1).replace('page/', '')}`;
      console.log(`Custom page URL formatted from "${trimmedUrl}" to "${result}"`);
      return result;
    }
    console.log(`Custom page URL already properly formatted: ${trimmedUrl}`);
    return trimmedUrl;
  } 
  
  // For other internal URLs, ensure they start with a /
  if (!trimmedUrl.startsWith('/')) {
    const result = `/${trimmedUrl}`;
    console.log(`Internal URL formatted from "${trimmedUrl}" to "${result}"`);
    return result;
  }
  
  // Return URL as is if it already has the correct format
  console.log(`URL already properly formatted: ${trimmedUrl}`);
  return trimmedUrl;
};
