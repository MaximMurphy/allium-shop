import {motion, AnimatePresence} from 'framer-motion';
import {useLocation, useOutlet} from '@remix-run/react';

export function PageTransition() {
  const location = useLocation();
  const outlet = useOutlet();

  // Don't animate transitions between nested collection routes
  const isCollectionRoute = location.pathname.startsWith('/collections');

  if (isCollectionRoute) {
    return <>{outlet}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: -20}}
        transition={{duration: 0.3, ease: 'easeInOut'}}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );
}
