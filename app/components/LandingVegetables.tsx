import Garlic from '../assets/veg/garlic.png';
import GreenOnion from '../assets/veg/green-onion.png';
import Leek from '../assets/veg/leek.png';
import RedOnion from '../assets/veg/red-onion.png';
import Shallot from '../assets/veg/shallot.png';
import SweetOnion from '../assets/veg/sweet-onion.png';

export function LandingVegetables() {
  return (
    <div className="w-full h-full flex items-end justify-start ">
      <div className="flex w-full items-end justify-center lg:justify-start">
        <img
          src={SweetOnion}
          alt="Sweet Onion"
          className="w-32 md:w-40 h-32 md:h-40 object-contain relative"
        />
        <img
          src={RedOnion}
          alt="Red Onion"
          className="w-32 md:w-40 h-32 md:h-40 object-contain relative"
        />
        <img
          src={Garlic}
          alt="Garlic"
          className="w-28 md:w-40 h-28 md:h-40 object-contain relative"
        />
      </div>
    </div>
  );
}
