import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from '@remix-run/react';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {Container} from '~/components/Container';
import headerLogo from '../assets/header-logo.png';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

export function Header({header, isLoggedIn, cart}: HeaderProps) {
  const {shop} = header;
  const {open} = useAside();

  return (
    <header className="sticky top-0 z-10 text-allium-cream bg-allium-green py-2 font-medium border-b-2 border-allium-dark-green">
      <Container>
        <div className="flex justify-between items-center">
          {/* Desktop Navigation */}
          <div className="w-1/3 hidden md:flex gap-4 md:gap-8 items-center">
            <NavLink
              prefetch="intent"
              to="/"
              className="hover:underline transition-all duration-300"
            >
              Shop
            </NavLink>
            <NavLink
              prefetch="intent"
              to="/collections"
              className="hover:underline transition duration-300"
            >
              Collections
            </NavLink>
          </div>

          <div className="w-1/2 md:w-1/3 flex justify-start md:justify-center">
            <NavLink
              prefetch="intent"
              to="/"
              className="flex justify-center md:flex-1"
            >
              <img src={headerLogo} alt={shop.name} className="h-12" />
            </NavLink>
          </div>

          <div className="w-1/2 md:w-1/3 flex gap-4 md:gap-8 items-center justify-end">
            <CartToggle cart={cart} />
            <button
              className="md:hidden hover:underline hover:cursor-pointer transition duration-300"
              onClick={() => open('mobile')}
            >
              ☰
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}

export function HeaderMenu() {
  return (
    <nav className="flex flex-col gap-8 text-allium-dark-green text-3xl">
      <NavLink
        prefetch="intent"
        to="/"
        className="hover:underline transition duration-300"
      >
        Home
      </NavLink>
      <NavLink
        prefetch="intent"
        to="/"
        className="hover:underline transition duration-300"
      >
        Shop
      </NavLink>
      <NavLink
        prefetch="intent"
        to="/collections"
        className="hover:underline transition duration-300"
      >
        Collections
      </NavLink>
    </nav>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      className="text-allium-cream hover:underline hover:cursor-pointer transition duration-300"
      onClick={() => {
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      Cart [{count ?? 0}]
    </button>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}
