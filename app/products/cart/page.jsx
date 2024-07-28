"use client";
import ProductContext from "@/context/ProductContext";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const { cart, setCart } = useContext(ProductContext);

  // Initialize cart items with quantity if not present
  const initializeCartWithQuantity = (items) => {
    return items.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      setCart(initializeCartWithQuantity(cartItems));
    }
  }, [setCart]);

  const handleDelete = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (itemId, increment) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) + increment) } // Ensure quantity is at least 1
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const formattedTotalAmount = totalAmount.toFixed(2);

  return (
    <div className="px-12 pt-8 md:pt-20 lg:pt-24 pb-12 min-h-screen max-w-[100rem] mx-auto flex flex-col md:flex-row lg:flex-row gap-10 md:gap-56 lg:gap-56">
      <div>
        <h2 className="text-2xl lg:text-4xl mb-4 uppercase pt-12">
          Purchase your Item!
        </h2>
        <p className="text-xl">Total Amount: ${formattedTotalAmount}</p>
      </div>
      <div className="gap-8">
        {cart.length === 0 ? (
          <p className="mx-auto text-xl">Cart is Empty</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="my-3 p-8 rounded-lg border-2 border-gray-500 border-opacity-10 shadow-lg bg-orange-100"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-28 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-lg mb-4">${item.price} x {item.quantity || 1}</p>
              <div className="flex items-center mb-4">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="px-2 py-1 bg-gray-952 text-white rounded-lg mr-2"
                >
                  -
                </button>
                <span className="text-lg mx-2">{item.quantity || 1}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="px-2 py-1 bg-gray-952 text-white rounded-lg ml-2"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-2 py-1 bg-red-800 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
