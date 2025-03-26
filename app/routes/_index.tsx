import {type MetaFunction} from '@remix-run/react';
import {Link} from '@remix-run/react';
import helloChef from '../assets/hello-chef.png';
import alliumText from '../assets/allium-text.svg';
import GarlicMarquee from '~/components/GarlicMarquee';
import GarlicModelClient from '~/components/GarlicModelClient';
import {FullWidthImage} from '~/components/FullWidthImage';

export const meta: MetaFunction = () => {
  return [{title: 'Allium Shop | Home'}];
};

export default function Homepage() {
  return (
    <div className="w-full h-full md:h-[calc(100vh-4rem)] bg-allium-cream flex flex-col items-center justify-between">
      <div className="w-full">
        <FullWidthImage src={alliumText} alt="Allium" />
      </div>
      <section className="h-full w-full flex flex-col justify-between pt-12 pb-24">
        <div className="w-full flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2"></div>
          <div className="w-full md:w-1/2 flex">
            <p className="h-full text-2xl md:text-5xl text-allium-green italic text-right">
              Browse our collection of culinary inspired designs. Perfect for
              any chef, home cook, or food lover.
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-6 md:gap-8">
          <ButtonSection />
        </div>
      </section>
      <div className="z-20 w-screen flex h-8">
        <div className="w-1/4 bg-allium-brown"></div>
        <div className="w-1/4 bg-allium-dark-green"></div>
        <div className="w-1/4 bg-allium-dark-brown"></div>
        <div className="w-1/4 bg-allium-light-green"></div>
      </div>
    </div>
  );
}

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

const ButtonSection = () => {
  return (
    <div className="w-full md:w-xl flex justify-between items-center text-lg md:text-2xl">
      <Link
        to="/collections"
        className="bg-allium-dark-green text-allium-cream px-2 md:px-8 py-2 md:py-4 rounded-lg border-2 border-allium-dark-green hover:bg-allium-light-green transition duration-300 text-center"
      >
        Shop The Collection
      </Link>
      <span className="text-4xl">✦</span>
      <Link
        to="/about"
        className="border-2 border-allium-dark-green text-allium-dark-green px-2 md:px-8 py-2 md:py-4 rounded-lg hover:bg-allium-light-green hover:text-allium-cream transition duration-300 text-center"
      >
        About Us
      </Link>
    </div>
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
