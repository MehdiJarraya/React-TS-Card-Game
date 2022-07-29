import { useCallback, useEffect, useState } from 'react';

const getMatches = (query: string): boolean => {
  // Prevents SSR issues
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia(query).matches;
  }
  return false;
};

// Checks if the current environment matches a given media query
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(getMatches(query));

  // useCallback hooks is useful to maintain the same memory reference of "handleChange" through each render
  const handleChange = useCallback(() => {
    setMatches(getMatches(query));
  }, [query]);

  useEffect(() => {
    const matchMedia = typeof window.matchMedia === 'function' && window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    if (matchMedia) {
      if (matchMedia.addListener) {
        matchMedia.addListener(handleChange);
      } else {
        matchMedia.addEventListener('change', handleChange);
      }
    }

    return () => {
      if (matchMedia) {
        if (matchMedia.removeListener) {
          matchMedia.removeListener(handleChange);
        } else {
          matchMedia.removeEventListener('change', handleChange);
        }
      }
    };
  }, [handleChange, query]);

  return matches;
}

export default useMediaQuery;
