let time = null;
const debounce = (callback, delay) => {
  if (time) clearTimeout(time);
  time = setTimeout(callback, delay);
};

export default debounce;
