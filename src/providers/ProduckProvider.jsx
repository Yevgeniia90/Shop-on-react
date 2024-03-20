import React, { useEffect, useState } from 'react';
import ProductContext from '../contexts/ProductContext';

const ProductProvider = ({ children }) => {
  const [likes, setLikes] = useState(localStorage.getItem('likes') ? JSON.parse(localStorage.getItem('likes')) : []);
  const [cartCount, setCartCount] = useState(localStorage.getItem('cartCount') ? JSON.parse(localStorage.getItem('cartCount')) : []);

 
  const addLikesProduct = (product) => {
    setLikes([...likes, product]);
  };

  const addCartCount = (product) => {
    setCartCount([...cartCount, { ...product, quantity: 1 }]);
  };
  
  const removeLikesProduct = (id) => {
    setLikes(likes.filter(f => f.id !== id));
  };

  const removeCartCount = (id) => {
    setCartCount(cartCount.filter(f => f.id !== id));
  };

     useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  useEffect(() => {
    localStorage.setItem('cartCount', JSON.stringify(cartCount));
  }, [cartCount]);

  const hasCartCount = (product) => cartCount.find(c => c.id === product.id);
 
  return (
    <ProductContext.Provider value={{ likes, cartCount, addLikesProduct, setCartCount, addCartCount, removeLikesProduct, removeCartCount, hasCartCount }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

