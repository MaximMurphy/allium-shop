import {useEffect, useState} from 'react';

const items = ['🧄', '🧅', '🧄', '🧅', '🧄', '🧅', '🧄', '🧅', '🧄', '🧅'];

export default function GarlicMarquee() {
  const [MarqueeComponent, setMarqueeComponent] = useState<any>(null);

  useEffect(() => {
    // Dynamically import the Marquee component
    import('react-fast-marquee').then((module) => {
      setMarqueeComponent(() => module.default);
    });
  }, []);

  if (!MarqueeComponent) {
    // Return a loading state or simplified version while the component loads
    return (
      <div className="whitespace-nowrap overflow-hidden">
        {items.map((item, index) => (
          <span key={index} className="mx-4 text-2xl">
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <MarqueeComponent
      speed={50}
      gradient={true}
      gradientColor="#fefbef"
      gradientWidth={25}
      className="whitespace-nowrap"
    >
      {items.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={index} className="mx-4 text-4xl">
          {item}
        </span>
      ))}
    </MarqueeComponent>
  );
}
