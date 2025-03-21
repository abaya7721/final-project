export const formatColumnName = (key) => {
  // Convert camelCase or snake_case to separate words
  const words = key
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/_/g, ' ')         // Replace underscores with spaces
    .toLowerCase();             // Convert to lowercase
    
  // Capitalize first letter of each word
  return words
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
