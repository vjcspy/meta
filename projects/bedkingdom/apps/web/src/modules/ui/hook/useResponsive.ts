import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return { isMobile, isDesktop: !isMobile };
};
