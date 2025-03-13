
/**
 * Format URL properly for storage and display
 * Now returns the URL as entered by the admin without modifications
 */
export const formatUrl = (url: string, isExternal: boolean): string => {
  console.log(`URL entered: "${url}", isExternal: ${isExternal}`);
  
  // Handle empty URLs
  if (!url || url.trim() === '') {
    const result = isExternal ? 'https://example.com' : '/';
    console.log(`Empty URL formatted to: ${result}`);
    return result;
  }
  
  const trimmedUrl = url.trim();
  
  // For external URLs, add https:// only if no protocol is specified
  if (isExternal) {
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
      const result = `https://${trimmedUrl}`;
      console.log(`External URL formatted from "${trimmedUrl}" to "${result}"`);
      return result;
    }
    console.log(`External URL: ${trimmedUrl}`);
    return trimmedUrl;
  }
  
  // For internal URLs, return as is (without adding a leading slash)
  console.log(`Internal URL: ${trimmedUrl}`);
  return trimmedUrl;
};
