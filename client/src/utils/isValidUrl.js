const isValidUrl = url => {
  return new Promise((resolve, reject) => {
    let timer,
      img = new Image();
    img.onerror = img.onabort = function() {
      clearTimeout(timer);
      reject(false);
    };
    img.onload = function() {
      clearTimeout(timer);
      resolve(true);
    };
    timer = setTimeout(function() {
      img.src = '//!!!!/test.jpg';
      console.log('Validating url timed out');
      reject(false);
    }, 2500);
    img.src = url;
  });
};

export default isValidUrl;
