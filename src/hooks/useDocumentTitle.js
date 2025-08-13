import { useEffect } from 'react';

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
