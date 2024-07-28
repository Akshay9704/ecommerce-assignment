"use client";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductContext from "@/context/ProductContext";

const ProductPage = ({ params }) => {
  const [data, setData] = useState(null);
  const { setCart } = useContext(ProductContext);
  const { slug } = params;

  useEffect(() => {
    const fetchProductBySlug = async (slug) => {
      const response = await fetch(`https://fakestoreapi.com/products/${slug}`);
      const product = await response.json();
      setData(product);
    };

    fetchProductBySlug(slug);
  }, [slug]);

  const handleAddToCart = () => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.some((item) => item.id === data.id);
      const updatedCart = isProductInCart ? prevCart : [...prevCart, data];

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="px-12 py-12 max-w-7xl mx-auto min-h-screen">
      <div className="mb-6 lg:mb-12">
        <h2 className="text-3xl lg:text-4xl items-start uppercase">
          {data.title}
        </h2>
        <Link href={`/products/cart`}>
          <button
            onClick={handleAddToCart}
            className="bg-orange-900 hover:bg-orange-950 text-white px-4 py-2 rounded-md mt-5 lg:flex"
          >
            Add to cart
          </button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-4">
        <div className="flex items-center justify-center">
          <Image
            className="rounded-lg shadow-xl border-4 border-gray-200 p-2 m-1 lg:min-w-[40rem] lg:min-h-[30rem]"
            width={600}
            height={600}
            alt={data.title}
            src={data.image}
          />
        </div>
        <div className="bg-gray-953 p-6 w-full">
          <label className="font-bold">💰 PRICE:</label>
          <p className="text-gray-800 text-2xl lg:text-3xl pt-4 py-6 text-center border-b-2 decoration-dotted border-dashed border-gray-800 border-opacity-15">
            ${data.price}
          </p>

          {data.rating && (
            <div className="pt-4">
              <label className="font-bold">⭐️ RATING:</label>
              <p className="text-gray-800 text-2xl lg:text-3xl py-6 text-center border-b-2 decoration-dotted border-dashed border-gray-800 border-opacity-15">
                {data.rating.rate} / 5
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="pt-6">
        <label className="font-bold pb-2 border-b-2 decoration-dotted border-dashed border-gray-800 border-opacity-15">
          📝 DESCRIPTION:
        </label>
        <p className="text-gray-600 text-lg my-4 pt-4 pb-6 ">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
