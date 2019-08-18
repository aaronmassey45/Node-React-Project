import { useState, useEffect } from 'react';

import debounce from '../utils/debounce';

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', debounce(handleResize, 500));

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
};

export default useWindowWidth;
