import React, { useContext, useEffect, useState } from 'react';
import ProductContext from '../../contexts/ProductContext';
import './Cartform.css';
import { Modal } from 'antd';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const Cartform = () => {
  const { cartCount, setCartCount, removeCartCount } = useContext(ProductContext);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [enlargedImageUrl, setEnlargedImageUrl] = useState(null);

  useEffect(() => {
    localStorage.setItem('cartCount', JSON.stringify(cartCount));
  }, [cartCount]);

  const handleIncrement = (product) => {
    const existingProduct = cartCount.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedCart = cartCount.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartCount(updatedCart);
    } else {
      setCartCount([...cartCount, { ...product, quantity: 1 }]);
    }
  };

  const handleDecrement = (product) => {
    const existingProduct = cartCount.find((item) => item.id === product.id);
    if (existingProduct && existingProduct.quantity > 1) {
      const updatedCart = cartCount.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartCount(updatedCart);
    }
  };

  const openImageModal = (image) => {
    setIsImageModalOpen(true);
    setEnlargedImageUrl(image);
  };

  const handleRemoveCartItem = (productId) => {
    removeCartCount(productId);
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < cartCount.length; i++) {
      const product = cartCount[i];
      totalPrice += product.price * product.quantity;
    }
    const roundedTotalPrice = parseFloat(totalPrice.toFixed(2));
    return roundedTotalPrice;
  };
  

  return (
    <div className="CartContainer">
      <h2>Корзина товаров</h2>
      <hr />
      <table className="cartTable">
        <thead>
          <tr>
            <th className="cartColumn">Название</th>
            <th className="cartColumn">Цена</th>
            <th className="cartColumn">Количество</th>
            <th className="cartColumn">Удалить</th>
          </tr>
        </thead>
        <tbody>
          {cartCount.length === 0 ? (
            <tr>
              <td className="emptyCart" colSpan="4">
                Ваша Корзина пуста
                <div>
                  <ShoppingCartCheckoutIcon sx={{ fontSize: 60 }} className='ShoppingCartCheckoutIcon' />
                </div>
              </td>
            </tr>
          ) : (
            cartCount.map((product) => (
              <tr key={product.id} className="cartRow">
                <td className="cartCell">
                  <div onClick={() => openImageModal(product.image)}>
                    <img className="imgForm" src={product.image} alt={product.title} />
                  </div>
                  <p className="titleForm">{product.title}</p>
                </td>
                <td className="cartCell">Цена: {product.price}$</td>
                <td className="cartCell">
                  <button onClick={() => handleDecrement(product)}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => handleIncrement(product)}>+</button>
                </td>
                <td className="cartCell">
                  <div className="DeletBtnn">
                    <button className="DeletBtn" onClick={() => handleRemoveCartItem(product.id)}>
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {cartCount.length > 0 && (<div className="totalPrice">Итого: {getTotalPrice()}$ <button className='BuyAll'>Оформить заказ</button></div>)}

      <Modal visible={isImageModalOpen} footer={null} onCancel={() => setIsImageModalOpen(false)}>
        <img className="enlarged-image" src={enlargedImageUrl} alt="Enlarged" />
      </Modal>
    </div>
  );
};

export default Cartform;
