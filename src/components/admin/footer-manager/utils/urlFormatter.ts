
/**
 * Formats a URL based on whether it's an external or internal link
 * @param url The URL to format
 * @param isExternal Whether the URL is external
 * @returns The formatted URL
 */
export const formatUrl = (url: string, isExternal: boolean): string => {
  let formattedUrl = url.trim();
  
  // For external URLs, ensure they have http:// or https://
  if (isExternal && !formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
    formattedUrl = `https://${formattedUrl}`;
  } 
  // For internal URLs (including page URLs), ensure they start with a forward slash
  else if (!isExternal && !formattedUrl.startsWith('/')) {
    formattedUrl = `/${formattedUrl}`;
  }
  
  return formattedUrl;
};
