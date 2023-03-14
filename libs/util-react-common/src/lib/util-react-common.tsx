import { useState, useEffect } from 'react';

export const useIsRendered = () => {
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    setRendered(true);
  }, []);
  return rendered;
};
