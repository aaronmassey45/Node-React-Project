// Courtesy of https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf

const debounce = (func, delay) => {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

export default debounce;
