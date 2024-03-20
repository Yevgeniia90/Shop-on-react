import React, { useEffect, useState } from 'react';
import './AllProducts.css';
import AllElectronic from './AllElectronic';
import Allcategories from './Allcategories';

const Electronic = () => {
  const [categories] = useState([]);
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/category/electronics')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log('Произошла ошибка при получении данных товаров:', error));
  }, []);

  return (
    <div>
      <h1>Электро товары</h1>
      <hr />

      <div className='ProductContainer'>
        {products
          .filter(product => categories.includes(product.category)).map(product => (
            <Allcategories key={product.id} product={product} />
          ))}
      </div>
      <div className='ProductContainer'>
        {products.map(product => (
          <AllElectronic key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Electronic;

