import { useMediaQuery } from '@react-hook/media-query';
import { useEffect, useState } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery('(max-width: 768px)');
  useEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);
  return isMobile;
}

export function useIsMini() {
  const [isMini, setIsMini] = useState(false);
  const mini = useMediaQuery('(max-width: 320px)');
  useEffect(() => {
    setIsMini(mini);
  }, [mini]);
  return isMini;
}
