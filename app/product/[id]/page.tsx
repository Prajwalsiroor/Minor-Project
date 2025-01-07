"use client";
import SingleProduct from '@/components/SingleProduct';
import { useSupabase } from '@/lib/supabase/hooks/useSupabase';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

const ProductPage = () => {
  const { id } = useParams(); // Get product ID from the route
  const { singleProduct, getSingleProduct } = useSupabase();

  useEffect(() => {
    if (id) {
      getSingleProduct(Number(id)); // Fetch the product by ID
    }
  }, [id, getSingleProduct]); // Dependency array

  return (
    <div>
      {singleProduct ? (
        <SingleProduct products={[singleProduct]} /> // Correctly passing the fetched product as an array
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
};

export default ProductPage;