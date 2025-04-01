import Garlic from '../assets/veg/garlic.png';
import GreenOnion from '../assets/veg/green-onion.png';
import Leek from '../assets/veg/leek.png';
import RedOnion from '../assets/veg/red-onion.png';
import Shallot from '../assets/veg/shallot.png';
import SweetOnion from '../assets/veg/sweet-onion.png';

export function LandingVegetables() {
  return (
    <div className="w-full h-full flex items-start justify-start">
      <div className="hidden md:flex w-full items-end justify-start">
        <img
          src={Shallot}
          alt="Shallot"
          className="w-24 md:w-40 h-24 md:h-40 object-contain relative z-10 -rotate-35 -ml-8 md:-ml-12"
        />
        <img
          src={Leek}
          alt="Leek"
          className="w-48 md:w-64 h-48 md:h-64 object-contain relative -ml-24 md:-ml-32"
        />
        <img
          src={SweetOnion}
          alt="Sweet Onion"
          className="w-24 md:w-40 h-24 md:h-40 object-contain relative -ml-24 md:-ml-28 z-10"
        />
        <img
          src={Garlic}
          alt="Garlic"
          className="w-20 md:w-32 h-20 md:h-32 object-contain relative -ml-2 md:-ml-4 z-20"
        />
        <img
          src={RedOnion}
          alt="Red Onion"
          className="w-24 md:w-40 h-24 md:h-40 object-contain relative md:-ml-2"
        />
        <img
          src={GreenOnion}
          alt="Green Onion"
          className="w-28 md:w-48 h-28 md:h-48 object-contain relative -ml-12 md:-ml-24 z-10"
        />
      </div>
      <div className="flex md:hidden w-full items-center justify-center">
        <img
          src={Garlic}
          alt="Garlic"
          className="w-48 h-48 object-contain relative z-10"
        />
      </div>
    </div>
  );
}
