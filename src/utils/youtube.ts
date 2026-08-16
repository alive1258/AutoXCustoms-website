/** Extracts the video ID from common YouTube URL formats, or returns the input unchanged if it already looks like a bare ID. */
export const extractYoutubeId = (url?: string): string | null => {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?&]+)/,
    /(?:youtube\.com\/embed\/)([^?&]+)/,
    /(?:youtube\.com\/shorts\/)([^?&]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  // Already a bare 11-character video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;

  return null;
};
