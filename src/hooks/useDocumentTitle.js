import { useEffect } from 'react';

// Page title change
export function useDocumentTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = `Movie | ${title}`;
    }
    return () => {
      document.title = 'usePopcorn';
    };
  }, [title]);
}
