import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import {Container} from '~/components/Container';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="z-20 h-full md:h-screen flex flex-col justify-between bg-allium-dark-green text-allium-cream">
            <div className="hidden md:flex">
              <DesktopNav currentYear={currentYear} />
            </div>
            <div className="md:hidden">
              <MobileNav currentYear={currentYear} />
            </div>
            <section className="flex flex-col justify-between">
              <img
                src="app/assets/footer-logos.png"
                alt="Allium Shop Logos"
                className="w-full h-auto"
              />

              <div className="flex h-8">
                <div className="w-1/4 bg-allium-brown"></div>
                <div className="w-1/4 bg-allium-dark-green"></div>
                <div className="w-1/4 bg-allium-dark-brown"></div>
                <div className="w-1/4 bg-allium-green"></div>
              </div>
            </section>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

const DesktopNav = ({currentYear}: {currentYear: number}) => {
  return (
    <section className="w-full h-full flex flex-col justify-between items-center pt-16 pb-12 text-lg md:text-xl lg:text-2xl gap-36">
      <Container className="flex flex-col justify-between gap-24">
        <div className="w-full flex flex-col justify-between gap-24">
          <nav className="w-full flex justify-between" role="navigation">
            <NavLink to="/" prefetch="intent" className="hover:underline">
              Home
            </NavLink>
            <NavLink to="/shop" prefetch="intent" className="hover:underline">
              Shop
            </NavLink>
            <NavLink to="/about" prefetch="intent" className="hover:underline">
              About
            </NavLink>
            <NavLink
              to="https://www.etsy.com/shop/AlliumApparel"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              Etsy
            </NavLink>
            <NavLink
              to="/contact"
              prefetch="intent"
              className="hover:underline"
            >
              Contact Us
            </NavLink>
          </nav>
          <nav className="w-full flex justify-between" role="navigation">
            <NavLink to="/faq" prefetch="intent" className="hover:underline">
              FAQ
            </NavLink>
            <NavLink
              to="/shipping"
              prefetch="intent"
              className="hover:underline"
            >
              Shipping
            </NavLink>
            <NavLink
              to="/returns"
              prefetch="intent"
              className="hover:underline"
            >
              Returns
            </NavLink>
            <NavLink
              to="/privacy-policy"
              prefetch="intent"
              className="hover:underline"
            >
              Privacy Policy
            </NavLink>
            <NavLink to="/terms" prefetch="intent" className="hover:underline">
              Terms & Conditions
            </NavLink>
          </nav>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between text-center text-base">
          <p className="my-2">Website by Luminance</p>
          <p className="my-2">© {currentYear} Allium. All rights reserved.</p>
        </div>
      </Container>
    </section>
  );
};

const MobileNav = ({currentYear}: {currentYear: number}) => {
  return (
    <section className="w-full h-full flex flex-col justify-between items-center py-12 text-sm gap-20">
      <Container className="flex flex-col justify-between gap-12">
        <div className="w-full flex flex-col justify-between gap-12">
          <nav className="w-full flex justify-between" role="navigation">
            <NavLink to="/" prefetch="intent" className="hover:underline">
              Home
            </NavLink>
            <NavLink to="/shop" prefetch="intent" className="hover:underline">
              Shop
            </NavLink>
            <NavLink to="/about" prefetch="intent" className="hover:underline">
              About
            </NavLink>
            <NavLink
              to="https://www.etsy.com/shop/AlliumApparel"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              Etsy
            </NavLink>
          </nav>
          <nav className="w-full flex justify-between" role="navigation">
            <NavLink
              to="/contact"
              prefetch="intent"
              className="hover:underline"
            >
              Contact Us
            </NavLink>
            <NavLink to="/faq" prefetch="intent" className="hover:underline">
              FAQ
            </NavLink>
            <NavLink
              to="/shipping"
              prefetch="intent"
              className="hover:underline"
            >
              Shipping
            </NavLink>
            <NavLink
              to="/returns"
              prefetch="intent"
              className="hover:underline"
            >
              Returns
            </NavLink>
          </nav>
          <nav className="w-full flex justify-between" role="navigation">
            <NavLink
              to="/privacy-policy"
              prefetch="intent"
              className="hover:underline"
            >
              Privacy Policy
            </NavLink>
            <NavLink to="/terms" prefetch="intent" className="hover:underline">
              Terms & Conditions
            </NavLink>
          </nav>
        </div>
        <div className="w-full flex justify-between text-xs">
          <p className="my-2">Website by Luminance</p>
          <p className="my-2">© {currentYear} Allium</p>
        </div>
      </Container>
    </section>
  );
};
