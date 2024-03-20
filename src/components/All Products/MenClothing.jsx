import React, { useEffect, useState } from 'react';
import './AllProducts.css';
import AllMenClothing from './AllMenClothing';
import Allcategories from './Allcategories';

const MenClothing = () => {
  const [categories] = useState([]);
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/men's clothing")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log('Произошла ошибка при получении данных товаров:', error));
  }, []);


  return (
    <div>
      <h1>Мужская одежда</h1>
      <hr />

      <div className='ProductContainer'>
        {products
          .filter(product => categories.includes(product.category)).map(product => (
            <Allcategories key={product.id} product={product} products={products} />
          ))}
      </div>

      <div className='ProductContainer'>
        {products.map(product => (
          <AllMenClothing key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MenClothing;