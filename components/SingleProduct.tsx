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
                                            <li>Processor: High performance MediaTek G85 Enhance gaming with 1GHz GPU 8GB of RAM including 4GB virtual 6.74 HD+ 90Hz display with Corning Gorilla Glass 3 Protection 50MP AI Triple camera Fast Side fingerprint 5000mAh Battery</li>
                                            <li>Processor: High performance MediaTek G85 Enhance gaming with 1GHz GPU 8GB of RAM including 4GB virtual 6.74 HD+ 90Hz display with Corning Gorilla Glass 3 Protection 50MP AI Triple camera Fast Side fingerprint 5000mAh Battery</li>
                                            <li>Processor: High performance MediaTek G85 Enhance gaming with 1GHz GPU 8GB of RAM including 4GB virtual 6.74 HD+ 90Hz display with Corning Gorilla Glass 3 Protection 50MP AI Triple camera Fast Side fingerprint 5000mAh Battery</li>
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