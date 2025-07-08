// Key for localStorage
const STORAGE_KEY = 'shortenedStats';

// Load all shortened URLs from localStorage
export const getAllURLs = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Save the full URL list back to localStorage
export const saveURLs = (urlList) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(urlList));
};

// Add a new shortened URL (or batch of them)
export const addShortenedURLs = (newEntries) => {
  const current = getAllURLs();
  const updated = [...current, ...newEntries];
  saveURLs(updated);
};

// Find a URL object by shortcode
export const findByShortcode = (shortcode) => {
  const urls = getAllURLs();
  return urls.find((u) => u.shortcode === shortcode);
};

// Add a click analytics entry to a given shortcode
export const logClick = (shortcode, clickInfo) => {
  const urls = getAllURLs();
  const index = urls.findIndex((u) => u.shortcode === shortcode);
  if (index !== -1) {
    urls[index].clicks = urls[index].clicks || [];
    urls[index].clicks.push(clickInfo);
    saveURLs(urls);
  }
};
