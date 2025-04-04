import {type MetaFunction} from '@remix-run/react';
import {Link} from '@remix-run/react';
import helloChef from '../assets/hello-chef.png';
import GarlicMarquee from '~/components/GarlicMarquee';
import GarlicModelClient from '~/components/GarlicModelClient';
import alliumText from '../assets/allium-text.svg';
import {FullWidthImage} from '~/components/FullWidthImage';
import {LandingVegetables} from '~/components/LandingVegetables';
import FeaturedProducts from '~/components/FeaturedProducts';

export const meta: MetaFunction = () => {
  return [{title: 'Allium Shop | Home'}];
};

export default function Homepage() {
  return (
    <>
      {/* Landing Section - Takes up full viewport height */}
      <div className="w-full h-[100svh] md:h-screen bg-allium-cream flex flex-col items-center justify-between">
        <div className="w-full">
          <FullWidthImage src={alliumText} alt="Allium" />
        </div>
        <section className="h-full w-full flex flex-col items-center justify-center pt-8 pb-16 md:pt-16 md:pb-16">
          <div className="w-full h-full flex flex-col lg:flex-row items-center gap-6 md:gap-8 max-w-7xl mx-auto px-4">
            <div className="w-full lg:w-1/2 pt-4">
              <LandingVegetables />
            </div>
            <div className="w-full lg:w-1/2 flex">
              <p className="w-full h-full text-3xl md:text-5xl text-allium-green italic text-center lg:text-right">
                Browse our collection of culinary inspired designs. Perfect for
                any chef, home cook, or food lover.
              </p>
            </div>
          </div>
          <div className="w-full h-full flex flex-col items-center justify-end gap-6 md:gap-0 md:pb-8">
            <ButtonSection />
            <div className="w-full flex items-center justify-between text-allium-green text-xl md:text-2xl max-w-7xl mx-auto px-8 md:-mt-6">
              <p>*</p>
              <p>*</p>
            </div>
          </div>
        </section>
        <div className="z-10 w-screen flex h-8 md:h-12">
          <div className="w-1/4 bg-allium-brown"></div>
          <div className="w-1/4 bg-allium-dark-green"></div>
          <div className="w-1/4 bg-allium-dark-brown"></div>
          <div className="w-1/4 bg-allium-green"></div>
        </div>
      </div>

      {/* Additional content  after landing - will reveal header when scrolled to */}
      <FeaturedProducts />
    </>
  );
}

const ButtonSection = () => {
  return (
    <div className="w-full md:w-3xl flex justify-between items-center text-lg md:text-2xl px-8 md:px-0">
      <Link
        to="/collections/all"
        className="w-fit md:w-80 bg-allium-dark-green text-allium-cream px-2 md:px-8 py-2 md:py-4 rounded-lg border-2 border-allium-dark-green hover:bg-allium-light-green transition duration-300 text-center"
      >
        Shop The Collection
      </Link>
      <span className="text-4xl">✦</span>
      <Link
        to="/about"
        className="w-fit md:w-80 border-2 border-allium-dark-green text-allium-dark-green px-2 md:px-8 py-2 md:py-4 rounded-lg hover:bg-allium-light-green hover:text-allium-cream transition duration-300 text-center"
      >
        About Us
      </Link>
    </div>
  );
};

const HelloChefSection = () => {
  return (
    <img
      src={helloChef}
      alt="Allium Chef"
      width={2000}
      height={500}
      className="w-xl object-contain"
    />
  );
};

const TextSection = () => {
  return (
    <p className="w-full md:w-3xl text-2xl md:text-3xl text-allium-green italic text-center">
      Browse our collection of culinary inspired designs. Perfect for any chef,
      home cook, or food lover.
    </p>
  );
};

const GarlicMarqueeSection = () => {
  return (
    <div className="w-full overflow-hidden">
      <GarlicMarquee />
    </div>
  );
};

const Garlic3DModel = () => {
  return (
    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
      <GarlicModelClient />
    </div>
  );
};
