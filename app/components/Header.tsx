import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from '@remix-run/react';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
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
    <header className="bg-allium-green text-allium-cream py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          <NavLink
            prefetch="intent"
            to="/"
            className="text-allium-cream hover:underline transition-all duration-300"
          >
            Shop
          </NavLink>
          <NavLink
            prefetch="intent"
            to="/collections"
            className="text-allium-cream hover:underline transition duration-300"
          >
            Collections
          </NavLink>
        </nav>

        <NavLink
          prefetch="intent"
          to="/"
          className="flex justify-center md:flex-1"
        >
          <img src={headerLogo} alt={shop.name} className="h-12" />
        </NavLink>

        <div className="flex gap-4 md:gap-8 items-center">
          <NavLink
            prefetch="intent"
            to="/account"
            className="hidden md:block text-allium-cream hover:underline transition duration-300"
          >
            <Suspense fallback="Account">
              <Await resolve={isLoggedIn} errorElement="Account">
                {(isLoggedIn) => 'Account'}
              </Await>
            </Suspense>
          </NavLink>
          <CartToggle cart={cart} />
          <button
            className="md:hidden text-allium-cream hover:underline hover:cursor-pointer transition duration-300"
            onClick={() => open('mobile')}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}

export function HeaderMenu() {
  return (
    <nav className="flex flex-col gap-4">
      <NavLink
        prefetch="intent"
        to="/"
        className="text-allium-green hover:underline transition duration-300"
      >
        Home
      </NavLink>
      <NavLink
        prefetch="intent"
        to="/"
        className="text-allium-green hover:underline transition duration-300"
      >
        Shop
      </NavLink>
      <NavLink
        prefetch="intent"
        to="/collections"
        className="text-allium-green hover:underline transition duration-300"
      >
        Collections
      </NavLink>
      <NavLink
        prefetch="intent"
        to="/account"
        className="text-allium-green hover:underline transition duration-300"
      >
        Account
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
