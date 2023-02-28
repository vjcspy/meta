import { useEffect } from 'react';

export const useOutsideClickHandle = (ref: any, onClickOut: () => void) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOut();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside, {
      passive: true,
    });
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};
