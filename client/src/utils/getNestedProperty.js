const getNestedProperty = (nestedObj, paths) => {
  const pathsArr = Array.isArray(paths) ? [...paths] : paths.split('.');
  return pathsArr.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
    nestedObj
  );
};

export default getNestedProperty;
