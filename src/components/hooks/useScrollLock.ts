import { useEffect, useState, useCallback } from 'react';

interface UseScrollLockOptions {
  lock?: boolean;
}

export function useScrollLock({ lock = false }: UseScrollLockOptions = {}) {
  const [isLocked, setIsLocked] = useState(lock);

  const lockScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPadding = window.getComputedStyle(document.body).paddingRight;
    
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '0px';
    
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPadding;
    };
  }, []);

  const unlockScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    
    if (lock) {
      cleanup = lockScroll();
      setIsLocked(true);
    } else {
      unlockScroll();
      setIsLocked(false);
    }

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [lock, lockScroll, unlockScroll]);

  return { isLocked };
}