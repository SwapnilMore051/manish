function getYouTubeEmbedUrl(url: string): string {
  if (!url) return "";

  try {
    // Handle short links like https://youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) {
      return `https://www.youtube.com/embed/${shortMatch[1]}`;
    }

    // Handle long links like https://www.youtube.com/watch?v=VIDEO_ID
    const longMatch = url.match(/[?&]v=([^?&]+)/);
    if (longMatch) {
      return `https://www.youtube.com/embed/${longMatch[1]}`;
    }

    // Already embed format
    if (url.includes("youtube.com/embed/")) {
      return url;
    }

    return url; // fallback (invalid or not a YouTube URL)
  } catch {
    return url;
  }
}

export default getYouTubeEmbedUrl;