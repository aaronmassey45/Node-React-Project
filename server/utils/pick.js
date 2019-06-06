module.exports = (object, paths) => {
  const newObj = {};

  for (let path of paths) {
    if (object[path]) {
      newObj[path] = object[path];
    }
  }

  return newObj;
};
