"use client";
import { useContext, useState } from "react";
import ProductContext from "@/context/ProductContext";
import Card from "@/components/card";

export default function Home() {
  const { products } = useContext(ProductContext);

  return (
    <main className="min-h-screen max-w-[100rem] mx-auto">
      <div className="px-12 pt-12 pb-20">
        <h2 className="text-4xl mt-20 mb-16">ALL PRODUCTS</h2>
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((item, idx) => (
              <Card id={item.id} key={`${item.name}-${idx}`} {...item} />
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-800">All our products are gone...</p>
        )}
      </div>
    </main>
  );
}
