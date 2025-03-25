import {type MetaFunction} from '@remix-run/react';
import {Link} from '@remix-run/react';
import helloChef from '../assets/hello-chef.png';
import GarlicMarquee from '~/components/GarlicMarquee';

export const meta: MetaFunction = () => {
  return [{title: 'Allium Shop | Home'}];
};

export default function Homepage() {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-allium-cream flex items-center px-8 md:px-24 lg:px-36">
      <div className="w-full flex flex-col md:flex-row items-center justify-between">
        <div className="w-1/2 space-y-12">
          <img
            src={helloChef}
            alt="Allium Chef"
            width={648}
            height={104}
            className="object-contain"
          />
          <p className="text-4xl text-allium-green italic text-justify">
            At Allium, our clothing celebrates the humble yet mighty garlic and
            onion. Wear your culinary passion with our unique, chef-inspired
            designs.
          </p>
          <div className="w-full space-y-8">
            <div className="w-full flex justify-between text-2xl">
              <Link
                to="/collections"
                className="bg-allium-dark-green text-allium-cream px-8 py-4 rounded-lg border-2 border-allium-dark-green hover:bg-allium-cream hover:text-allium-dark-green transition duration-300 text-center"
              >
                Shop The Collection
              </Link>
              <Link
                to="/about"
                className="border-2 border-allium-dark-green text-allium-dark-green px-8 py-4 rounded-lg hover:bg-allium-dark-green hover:text-allium-cream transition duration-300 text-center"
              >
                About Us
              </Link>
            </div>
            <div className="w-full overflow-hidden">
              <GarlicMarquee />
            </div>
          </div>
        </div>
        <div className="w-1/2 flex justify-end mt-24">
          <div className="h-[30rem] w-[30rem] bg-allium-dark-brown rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
