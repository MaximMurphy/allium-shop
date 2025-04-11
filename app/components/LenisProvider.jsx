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

    // Stop scrolling during page transition
    lenisRef.current.stop();

    // Resume scrolling after transition
    const timer = setTimeout(() => {
      lenisRef.current.start();

      // Only scroll to top on POP (back/forward) or PUSH (new navigation)
      if (navigationType === 'POP' || navigationType === 'PUSH') {
        lenisRef.current.scrollTo(0, {immediate: true});
      }
    }, 300); // Match this with your transition duration

    return () => clearTimeout(timer);
  }, [location.pathname, navigationType]);

  return children;
}
