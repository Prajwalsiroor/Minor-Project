"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/lib/supabase/hooks/redux";
import {
    clearAllCart,
    decrementQuantity,
    incrementQuantity,
    removeFromTheCart,
} from "@/redux/cartSlice";
import Subtotal from "./shared/Subtotal";

interface CartItem {
    id: string;
    image: string;
    title: string;
    price: number;
    quantity: number;
}

const ShoppingCart = ({ cart, totalPrice }: { cart: CartItem[]; totalPrice: number }) => {
    const dispatch = useAppDispatch();

    const handleRemove = useCallback(
        (id: string) => {
            dispatch(removeFromTheCart(id));
        },
        [dispatch]
    );

    // If cart is empty, show a message
    if (cart.length === 0) {
        return <div className="text-center py-10 text-lg font-bold  text-black">Your shopping cart is empty.</div>;
    }

    return (
        <div className="w-[70%] mx-auto mt-8  text-black">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-300 py-5">
            <h1 className="font-bold text-2xl text-black">Shopping Cart</h1>
            <h1 className="font-medium text-lg text-gray-700">Price</h1>
            </div>

            {/* Cart Items */}
            {cart.map((product) => (
                <div key={product.id} className="py-4 flex justify-between border-b  text-black border-gray-200">
                    <div className="flex">
                        {/* Product Image */}
                        <Image
                            src={product.image}
                            width={100}
                            height={100}
                            alt={product.title}
                            className="object-cover"
                            onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
                        />
                        {/* Product Details */}
                        <div className="ml-4">
                            <h1 className="font-medium">{product.title}</h1>
                            <p className="text-[#007600] font-bold my-1 text-xs">In Stock</p>
                            <h1
                                onClick={() => handleRemove(product.id)}
                                className="font-bold text-red-600 cursor-pointer w-fit "
                            >
                                REMOVE
                            </h1>
                            {/* Quantity Controls */}
                            <div className="flex text-2xl font-bold justify-between items-center w-fit  text-black bg-gray-200 rounded-md px-5 py-1 mt-2">
                                <div
                                    onClick={() =>
                                        product.quantity > 1 && dispatch(decrementQuantity(product))
                                    }
                                    className="cursor-pointer mr-4"
                                >
                                    -
                                </div>
                                <div>{product.quantity}</div>
                                <div
                                    onClick={() => dispatch(incrementQuantity(product))}
                                    className="cursor-pointer ml-4"
                                >
                                    +
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Product Price */}
                    <div>
                        <h1 className="font-bold text-xl">
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(product.price)}
                        </h1>
                        <p className="text-xs py-1  text-black">
                            M.R.P.: <span className="line-through  text-black">₹3,995.00</span>
                        </p>
                    </div>
                </div>
            ))}

            {/* Clear All and Subtotal */}
            <h1
                onClick={() => {
                    dispatch(clearAllCart());
                }}
                className="text-red-600 font-bold cursor-pointer py-2"
            >
                CLEAR ALL
            </h1>
            <Subtotal left={false} length={cart.length} totalPrice={totalPrice} />
        </div>
    );
};

export default ShoppingCart;
