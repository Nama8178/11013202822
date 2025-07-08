// ✅ Check if a given string is a valid URL
export const isValidUrl = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

// ✅ Check if a value is a valid positive integer (for validity minutes)
export const isValidValidity = (value) => {
  return /^\d+$/.test(value) && parseInt(value) > 0;
};

// ✅ Check if a shortcode is valid (alphanumeric, underscores, hyphens)
export const isValidShortcode = (code) => {
  return /^[a-zA-Z0-9_-]+$/.test(code);
};
