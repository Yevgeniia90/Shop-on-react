import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ThemeContext from '../../contexts/ThemeContext';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ProductContext from '../../contexts/ProductContext';
import { Modal } from 'antd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LikedProducts from '../Likeform/LikeProducts';
import Cartform from '../Cardform/Cartform';


const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { likes, cartCount } = useContext(ProductContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className={theme}>
      <nav>
        <NavLink to="/AllProducts">Все товары</NavLink>
        <NavLink to="/Electronic">Электро товары</NavLink>
        <NavLink to="/Jewelery">Украшения</NavLink>
        <NavLink to="/MenClothing">Мужская одежда</NavLink>
        <NavLink to="/WomenClothing">Женская одежда</NavLink>
        <ThumbUpIcon className="Likes" onClick={openModal} /> {likes.length}
        <ShoppingCartIcon className="BuyCard" onClick={handleCartClick} /> {cartCount.length}
      </nav>
      
      {theme === 'light' ? (
        <DarkModeIcon onClick={toggleTheme} />
      ) : (
        <LightModeIcon onClick={toggleTheme} />
      )}

      <Modal visible={isModalVisible} onCancel={closeModal} footer={null} destroyOnClose>
        <LikedProducts likes={likes} visible={isModalVisible} onClose={closeModal} />
      </Modal>

      {isCartOpen && (
        <Modal visible={isCartOpen} onCancel={handleCartClick} footer={null} destroyOnClose>
          <Cartform />
        </Modal>
      )}
    </header>
  );
};

export default Header;





