import {useEffect, useRef} from 'react';
import Lenis from '@studio-freight/lenis';
import {useLocation, useNavigationType} from '@remix-run/react';

export default function LenisProvider({children}) {
  // Always call hooks at the top level
  const location = useLocation();
  const navigationType = useNavigationType();
  const lenisRef = useRef();

  // Initialize Lenis only on client-side
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []); // Initialize Lenis only once

  // Separate useEffect for handling location changes
  useEffect(() => {
    if (!lenisRef.current) return;

    // Only scroll to top on POP (back/forward) or PUSH (new navigation)
    // but not on REPLACE (which shouldn't change scroll position)
    if (navigationType === 'POP' || navigationType === 'PUSH') {
      // Small timeout to ensure the new page is ready
      setTimeout(() => {
        lenisRef.current.scrollTo(0, {immediate: true});
      }, 0);
    }
  }, [location.pathname, navigationType]);

  return children;
}
