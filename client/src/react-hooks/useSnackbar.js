import { useState } from 'react';

const useSnackbar = () => {
  const [isShown, setIsShown] = useState(false);
  const [message, setMessage] = useState('');

  const showSnackBar = () => {
    setIsShown(true);

    setTimeout(() => {
      setIsShown(false);
    }, 3000);
  };

  const setMessageAndShowSnackbar = msg => {
    setMessage(msg);
    showSnackBar();
  };

  return { isShown, showSnackBar, message, setMessageAndShowSnackbar };
};

export default useSnackbar;
