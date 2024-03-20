import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import ThemeProvider from './providers/ThemeProvider';
import AllProducts from './components/All Products/All Products';
import ProductProvider from './providers/ProduckProvider';
import Electronic from './components/All Products/Electronic';
import Jewelery from './components/All Products/Jewelery';
import MenClothing from './components/All Products/MenClothing';
import WomenClothing from './components/All Products/WomenClothing';

const App = () => {
  return (
    <div>
      <ThemeProvider>
        <ProductProvider>
          <Header />
          <Routes>
            <Route path="/" element={<AllProducts />} />
            {/* <Route path="/AllProducts" element={<AllProducts />} /> */}
            <Route path="/Electronic" element={<Electronic />} />
            <Route path="/Jewelery" element={<Jewelery />} />
            <Route path="/MenClothing" element={<MenClothing />} />
            <Route path="/WomenClothing" element={<WomenClothing />} />
            <Route path="*" element={<h1>Page not Found</h1>} />
          </Routes>
        </ProductProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;

