import Image from 'next/image';
import React from 'react';
import Ratings from './shared/Ratings';
import AddToCardContainer from './AddToCardContainer';

// Define an interface for product
interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  about?: string[];
}

const SingleProduct = ({ products }: { products: Product[] }) => {
  return (
    <div className="w-[80%] mx-auto mt-10 text-black">
      <div className="flex flex-wrap justify-between">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col md:flex-row w-full md:w-1/2 lg:w-1/3 mb-8">
            <div className="bg-gray-100 text-black flex-shrink-0">
              <Image
                className="mix-blend-multiply p-4"
                src={product.image}
                width={300}
                height={300}
                alt={product.title}
                priority
              />
            </div>
            <div className="mx-4 w-full md:w-[70%] text-black">
              <h1 className="font-bold text-lg text-black">{product.title}</h1>
              <p>{product.description}</p>
              <Ratings ratings={product.rating} />
              <h1 className="font-bold">{`₹${product.price}`}</h1>
              {product.about && (
                <div>
                  <h1 className="font-bold text-sm text-black">About this item&apos;s details</h1>
                  <ul className="list-disc ml-4">
                    {product.about.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <AddToCardContainer product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleProduct;
