"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductContext from "./ProductContext";

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts, cart, setCart }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
