import React, { useContext, useEffect, useState } from 'react';
import { Rate } from 'antd';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductContext from '../../contexts/ProductContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const AllMenClothing = ({ product }) => {
  const { likes, addLikesProduct, removeLikesProduct, cartCount, setCartCount } = useContext(ProductContext);
  const [selectedProduct, setSelecteProduct] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const addHandleClick = () => {
    addLikesProduct(product);
  };

  const removeHandleClick = () => {
    removeLikesProduct(product.id);
  };

  const handleBuyProduct = () => {
    if (!isAddedToCart) {
      const existingProduct = cartCount.find(item => item.id === product.id);
      if (existingProduct) {
        setIsAddedToCart(true);
      } else {
        const updatedCart = [...cartCount, { ...product, quantity: 1 }];
        setCartCount(updatedCart);
        setIsAddedToCart(true);
      }
    }
  };

  useEffect(() => {
    const existingProduct = cartCount.find(item => item.id === product.id);
    setIsAddedToCart(!!existingProduct);
  }, [cartCount, product.id]);

  const description = () => {
    setSelecteProduct(!selectedProduct);
  };


  return (
    <div className="ProductList">
      <div className="productInfo">
        <img className="img" src={product.image} alt={product.title} />
        <div className="likeButton">
          {likes.find(p => product.id === p.id) ? <FavoriteIcon className='red' onClick={removeHandleClick} /> : <FavoriteBorderIcon onClick={addHandleClick} />}
        </div>
      </div>
      <div className="ProductDetails">
        <div className='expert'>
          <h3>{product.title}</h3>
        </div>
        <p className='Price'>Цена: ${product.price}</p>
        <div className='BuyRate'>
          <button className={`Buy ${isAddedToCart ? 'AddedToCart' : ''}`} onClick={handleBuyProduct} disabled={isAddedToCart}>
            <ShoppingCartIcon className="BuyCard" />
            {isAddedToCart ? 'Добавлено' : 'Купить'}
          </button>
          <Rate allowHalf className='Rate' value={product.rating.rate} disabled />
        </div>

        <div>
          <button className="Learn" onClick={description}> Описание </button>
          {selectedProduct && <div className="description">{product.description}</div>}
        </div>
      </div>
    </div>
  );
};

export default AllMenClothing;