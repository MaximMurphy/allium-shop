import {useEffect, useState} from 'react';
import {Header} from './Header';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';

interface ScrollHeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  showOnLanding?: boolean;
}

export function ScrollHeader({
  header,
  cart,
  isLoggedIn,
  publicStoreDomain,
  showOnLanding = false,
}: ScrollHeaderProps) {
  const [isVisible, setIsVisible] = useState(showOnLanding);

  useEffect(() => {
    const handleScroll = () => {
      // Get viewport height
      const viewportHeight = window.innerHeight;

      // Show header once scrolled past viewport height
      if (window.scrollY > viewportHeight - 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial check in case the page is loaded at a scrolled position
    handleScroll();

    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full transition-all duration-500 ease-in-out z-20 border-b-2 border-allium-dark-green ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <Header
        header={header}
        cart={cart}
        isLoggedIn={isLoggedIn}
        publicStoreDomain={publicStoreDomain}
      />
    </div>
  );
}
