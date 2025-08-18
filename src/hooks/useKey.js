import { useState, useEffect } from 'react';

export function useKey(onCloseMovie) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onCloseMovie();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseMovie]);
}
