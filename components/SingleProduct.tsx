import Image from 'next/image'
import React from 'react'
import Ratings from './shared/Ratings';
import AddToCardContainer from './AddToCardContainer';

const SingleProduct = ({ singleProduct }: { singleProduct: any }) => {
    
    return (
        <div className='w-[80%] mx-auto mt-10 text-black'>
            <div className='flex justify-between'>
                {
                        singleProduct.map((product: any) => {
                            return (
                                <div key={product.id} className='flex'>
                                <div className='flex'>
                                    <div className='bg-gray-100 text-black'>
                                        <Image className='mix-blend-multiply p-4' src={product.image} width={300} height={300} alt={product.title} />
                                    </div>
                                    <div className='mx-4 w-[70%] text-black'>
                                        <h1 className='font-bold text-lg text-black'>{product.title}</h1>
                                        <p>{product.description}</p>
                                        <Ratings ratings={product.rating} />
                                        <h1 className='font-bold'>{`$${product.price}`}</h1>
                                        <div>
                                            <h1 className='font-bold text-sm text-black'>About this item</h1>
                                            <li>A sturdy cotton twill fabric, usually blue, used for jeans and jackets. It's known for its durability and ruggedness.Cloth refers to any fabric or material made by weaving, knitting, felting, or bonding fibers together. The most common types include cotton, which is soft and breathable; linen, known for its coolness and absorbency; silk, prized for its luxurious sheen; wool, valued for its warmth; and synthetic fibers like polyester, which are durable and easy to care for. Each type has unique properties making it suitable for different applications, from clothing to upholstery to industrial uses.</li>
                                            <li>Cloth refers to any fabric or material made by weaving, knitting, felting, or bonding fibers together. The most common types include cotton, which is soft and breathable; linen, known for its coolness and absorbency; silk, prized for its luxurious sheen; wool, valued for its warmth; and synthetic fibers like polyester, which are durable and easy to care for. Each type has unique properties making it suitable for different applications, from clothing to upholstery to industrial uses.</li>
                                        </div>
                                    </div>
                                </div>
                                <AddToCardContainer product={product} />
                                </div>
                            )
                        })
                    } 
            </div>
        </div>
    )
}

export default SingleProduct