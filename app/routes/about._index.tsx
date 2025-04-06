import {type MetaFunction} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{title: 'Allium Shop | About Us'}];
};

export default function About() {
  return (
    <div className="w-full min-h-[100svh] md:h-screen pt-12 pb-24 md:pt-20 md:pb-0 text-allium-dark-brown">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">About Allium Shop</h1>
      </header>
      <main className="prose prose-lg max-w-none">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="mb-4">
              At Allium, our brand is a testament to our deep-rooted passion for
              all things food. We recognize the essential role of Alliums, like
              Garlic and Onions, in the culinary realm and aim to celebrate them
              through our company.
            </p>
            <p className="mb-4">
              Founded with a vision to create a shopping experience that
              combines exceptional products with outstanding customer service,
              we have grown into a trusted destination for discerning shoppers.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">What are Alliums?</h2>
            <p className="mb-4">
              This diverse botanical family includes onions, garlic, scallions,
              shallots, and leeks, all bearing the Latin name Allium, which
              directly translates to Garlic. As a collection of edible and
              aromatic plants, Alliums are known for their rich flavors, pungent
              aromas, and essential role in cuisines worldwide. Beyond flavor,
              these humble flowering plants offer a treasure trove of health
              benefits, including cardiovascular protection, anti-cancer
              properties, and anti-inflammatory effects, thanks to sulfur
              compounds and polyphenols like quercetin.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="mb-4">
            Our dedicated team works tirelessly to ensure every aspect of your
            shopping experience exceeds expectations. From product selection to
            customer service, we aare here to help.
          </p>
        </div>
      </main>
    </div>
  );
}
