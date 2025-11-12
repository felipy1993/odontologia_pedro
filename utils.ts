/**
 * Transforms a standard Google Drive sharing link into a direct, embeddable image URL.
 * This allows using "share" links from Google Drive directly in image tags.
 * @param url The original URL from Google Drive.
 * @returns The transformed URL if it's a valid Google Drive link, otherwise the original URL.
 */
export const transformGoogleDriveLink = (url?: string): string => {
  if (!url || typeof url !== 'string') {
    return '';
  }

  // Regex to capture the file ID from various Google Drive URL formats
  // Handles:
  // - drive.google.com/file/d/FILE_ID/view?usp=sharing
  // - drive.google.com/uc?export=view&id=FILE_ID
  // - drive.google.com/open?id=FILE_ID
  const regex = /drive\.google\.com\/(?:uc\?.*?id=|file\/d\/|open\?id=)([\w-]+)/;
  const match = url.match(regex);

  if (match && match[1]) {
    const fileId = match[1];
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  // If it's already in the correct direct link format, do nothing.
  if (url.startsWith('https://lh3.googleusercontent.com/d/')) {
    return url;
  }
  
  // Return original URL if it's not a recognizable Google Drive link
  return url;
};
