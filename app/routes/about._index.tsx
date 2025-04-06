import {type MetaFunction} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{title: 'Allium Shop | About Us'}];
};

export default function About() {
  return (
    <div className="w-full min-h-[100svh] md:h-screen pt-12 pb-24 md:pt-20 md:pb-0 text-allium-dark-green">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">About Allium Shop</h1>
      </header>
      <main className="prose prose-lg max-w-none">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="mb-4">
              Welcome to Allium Shop, where we are passionate about bringing you
              the finest products with a focus on quality and sustainability.
            </p>
            <p className="mb-4">
              Founded with a vision to create a shopping experience that
              combines exceptional products with outstanding customer service,
              we have grown into a trusted destination for discerning shoppers.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Quality First: We source only the best products</li>
              <li>Sustainability: Committed to eco-friendly practices</li>
              <li>Customer Focus: Your satisfaction is our priority</li>
              <li>Innovation: Always seeking better ways to serve you</li>
            </ul>
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
