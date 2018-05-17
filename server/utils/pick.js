module.exports = (object, paths) => {
  const newObj = {};

  Object.keys(object).forEach(key => {
    if (paths.includes(key)) {
      newObj[key] = object[key];
    }
  });

  return newObj;
};
