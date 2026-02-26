export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export const formatNumber = (num) => {
  return num.toLocaleString();
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
