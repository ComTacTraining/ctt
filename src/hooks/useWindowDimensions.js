import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
  const padding = 48;
  const { innerWidth, innerHeight } = window;
  const width = innerWidth - padding;
  const height = innerHeight;
  return { width, height };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
