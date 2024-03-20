import React, { useContext, useEffect, useState } from 'react';
import { Modal, Row, Col, Button, Tooltip, Rate } from 'antd';
import ProductContext from '../../contexts/ProductContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './LikeProducts.css';
import AddReactionIcon from '@mui/icons-material/AddReaction';

const LikedProducts = ({ likes, visible, onClose }) => {
  const { removeLikesProduct, cartCount, setCartCount } = useContext(ProductContext);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [activeDescription, setActiveDescription] = useState(null);

  const closeModal = () => {
    onClose();
  };

  const openImageModal = (image) => {
    setEnlargedImage(image);
  };

  const closeImageModal = () => {
    setEnlargedImage(null);
  };

  const handleProductDescription = (description) => {
    setActiveDescription(description);
  };

  const handleRemoveProduct = (id) => {
    removeLikesProduct(id);
  };

  const handleBuyProduct = (product) => {
    const existingProduct = cartCount.find(item => item.id === product.id);
    if (!existingProduct) {
      const updatedCart = [...cartCount, { ...product, quantity: 1 }];
      setCartCount(updatedCart);
    }
  };

  useEffect(() => {
    const existingProducts = cartCount.filter(item => likes.some(like => like.id === item.id));
    setCartCount(existingProducts);
  }, [likes]);

  return (
    <Modal visible={visible} onCancel={closeModal} footer={null} maskClosable={true}>
      <h2>Список понравившихся товаров:</h2>
      <hr />
      {likes.length === 0 ? (
        <div>
          <p className='Liketitle'>Список понравившихся товаров пуст</p>
          <div>
            <AddReactionIcon sx={{ fontSize: 60 }} className='AddReactionIcon' />
          </div>
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {likes.map((product) => (
            <Col key={product.id} span={8}>
              <div className="product-card">
                <img className="product-image" src={product.image} alt={product.title} onClick={() => openImageModal(product.image)} />
                <div className='expertLike'>
                <p className='ProductTitle'>{product.title}</p>
               </div>
                <p className='Price'>Цена: ${product.price}</p>
                <Tooltip title={product.description}>
                  <Button className='descriptionBtn' onClick={() => handleProductDescription(product.description)}>Описание</Button>
                  <Rate allowHalf className='Rate' value={product.rating.rate} disabled />
                </Tooltip>
                <button className={`Buy ${cartCount.some(item => item.id === product.id) ? 'AddedToCart' : ''}`} onClick={() => handleBuyProduct(product)} disabled={cartCount.some(item => item.id === product.id)}>
                  <ShoppingCartIcon className="BuyCard" />
                  {cartCount.some(item => item.id === product.id) ? 'Добавлено' : 'Купить'}
                </button>
                <Button className="RemoveBtn" onClick={() => handleRemoveProduct(product.id)}>Удалить</Button>
              </div>
            </Col>
          ))}
        </Row>
      )}

      {enlargedImage && (
        <Modal visible={true} onCancel={closeImageModal} footer={null}>
          <img className="enlarged-image" src={enlargedImage} alt="Enlarged" />
        </Modal>
      )}

      {activeDescription && (
        <Modal visible={true} onCancel={() => setActiveDescription(null)} footer={null}>
          <h3>Описание товара:</h3>
          <p>{activeDescription}</p>
        </Modal>
      )}
    </Modal>
  );
};

export default LikedProducts;



