import { useEffect } from 'react';

// Page title change
export function useDocumentTitle(title, defaultTitle = 'usePopcorn') {
  useEffect(() => {
    document.title = title || defaultTitle;

    return () => {
      document.title = defaultTitle;
    };
  }, [title, defaultTitle]);
}
