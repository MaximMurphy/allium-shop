import {type MetaFunction} from '@remix-run/react';
import {Link} from '@remix-run/react';
import helloChef from '../assets/hello-chef.png';
import GarlicMarquee from '~/components/GarlicMarquee';
import GarlicModelClient from '~/components/GarlicModelClient';
import alliumText from '../assets/allium-text.svg';
import {FullWidthImage} from '~/components/FullWidthImage';

export const meta: MetaFunction = () => {
  return [{title: 'Allium Shop | Home'}];
};

export default function Homepage() {
  return (
    <>
      {/* Landing Section - Takes up full viewport height */}
      <div className="w-full h-screen bg-allium-cream flex flex-col items-center justify-between">
        <div className="w-full">
          <FullWidthImage src={alliumText} alt="Allium" />
        </div>
        <section className="h-full w-full flex flex-col justify-between pt-20">
          <div className="w-full flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-8">
            <div className="w-full lg:w-1/2"></div>
            <div className="w-full lg:w-1/2 flex">
              <p className="h-full text-3xl md:text-5xl text-allium-green italic text-center lg:text-right">
                Browse our collection of culinary inspired designs. Perfect for
                any chef, home cook, or food lover.
              </p>
            </div>
          </div>
          <div className="w-full h-full flex flex-col items-center justify-end gap-8 mb-12">
            <ButtonSection />
            <div className="w-full flex items-center justify-between text-allium-green text-xl max-w-7xl mx-auto px-8">
              <p>*</p>
              <p>*</p>
            </div>
          </div>
        </section>
        <div className="z-10 w-screen flex h-8">
          <div className="w-1/4 bg-allium-brown"></div>
          <div className="w-1/4 bg-allium-dark-green"></div>
          <div className="w-1/4 bg-allium-dark-brown"></div>
          <div className="w-1/4 bg-allium-green"></div>
        </div>
      </div>

      {/* Additional content  after landing - will reveal header when scrolled to */}
      <FeaturedProductsSection />
    </>
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
    <div className="w-full md:w-3xl flex justify-between items-center text-lg md:text-2xl px-8 md:px-0">
      <Link
        to="/collections"
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

const FeaturedProductsSection = () => {
  return (
    <div className="w-full py-20 bg-allium-light-brown">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl md:text-6xl text-allium-dark-green font-medium mb-12">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sample product cards */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-allium-cream p-8 rounded-lg shadow-md">
              <div className="aspect-square bg-allium-light-green mb-4"></div>
              <h3 className="text-2xl text-allium-dark-green mb-2">
                Product {i}
              </h3>
              <p className="text-allium-green mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p className="text-xl font-medium text-allium-dark-green">
                $29.99
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
