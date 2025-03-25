import {type MetaFunction} from '@remix-run/react';
import {Link} from '@remix-run/react';
import helloChef from '../assets/hello-chef.png';
import GarlicMarquee from '~/components/GarlicMarquee';
import GarlicModelClient from '~/components/GarlicModelClient';

export const meta: MetaFunction = () => {
  return [{title: 'Allium Shop | Home'}];
};

export default function Homepage() {
  return (
    <div className="w-full h-full lg:h-[calc(100vh-4rem)] bg-allium-cream flex items-center  py-12 lg:py-0">
      <div className="w-full h-full flex flex-col lg:flex-row items-center lg:items-start justify-between mt-48">
        <div className="w-full lg:w-1/2 space-y-12">
          <img
            src={helloChef}
            alt="Allium Chef"
            width={2000}
            height={500}
            className="w-full object-contain"
          />
          <p className="text-4xl text-allium-green italic text-justify">
            At Allium, our clothing celebrates the humble yet mighty garlic and
            onion. Wear your culinary passion with our unique, chef-inspired
            designs.
          </p>
          <div className="w-full space-y-8">
            <div className="w-full flex justify-between items-center text-lg md:text-xl lg:text-2xl">
              <Link
                to="/collections"
                className="bg-allium-dark-green text-allium-cream px-2 md:px-4 lg:px-8 py-2 lg:py-4 rounded-lg border-2 border-allium-dark-green hover:bg-allium-cream hover:text-allium-dark-green transition duration-300 text-center"
              >
                Shop The Collection
              </Link>
              <span className="text-4xl">✦</span>
              <Link
                to="/about"
                className="border-2 border-allium-dark-green text-allium-dark-green px-2 md:px-4 lg:px-8 py-2 lg:py-4 rounded-lg hover:bg-allium-dark-green hover:text-allium-cream transition duration-300 text-center"
              >
                About Us
              </Link>
            </div>
            <div className="w-full overflow-hidden">
              <GarlicMarquee />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-24">
          <div className="h-[30rem] w-[30rem] bg-allium-dark-brown rounded-lg flex items-center justify-center">
            <GarlicModelClient />
          </div>
        </div>
      </div>
    </div>
  );
}
