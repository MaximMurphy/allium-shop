import Garlic from '../assets/veg/garlic.png';
import GreenOnion from '../assets/veg/green-onion.png';
import Leek from '../assets/veg/leek.png';
import RedOnion from '../assets/veg/red-onion.png';
import Shallot from '../assets/veg/shallot.png';
import SweetOnion from '../assets/veg/sweet-onion.png';

export function LandingVegetables() {
  return (
    <div className="w-full h-full flex items-start justify-start">
      <div className="w-full flex items-end justify-start">
        <img
          src={Shallot}
          alt="Shallot"
          className="w-40 h-40 object-contain relative z-10 -rotate-25 -ml-8"
        />
        <img
          src={Leek}
          alt="Leek"
          className="w-64 h-64 object-contain relative -ml-32"
        />
        <img
          src={SweetOnion}
          alt="Sweet Onion"
          className="w-40 h-40 object-contain relative -ml-28 z-10"
        />
        <img
          src={Garlic}
          alt="Garlic"
          className="w-32 h-32 object-contain relative -ml-4 z-20"
        />
        <img
          src={RedOnion}
          alt="Red Onion"
          className="w-40 h-40 object-contain relative -ml-2"
        />
        <img
          src={GreenOnion}
          alt="Green Onion"
          className="w-48 h-48 object-contain relative -ml-24 z-10"
        />
      </div>
    </div>
  );
}
