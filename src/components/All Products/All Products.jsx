import React, { useEffect, useState, useContext } from 'react';
import './AllProducts.css';
import { useSearchParams } from 'react-router-dom';
import ThemeContext from '../../contexts/ThemeContext';
import Allcategories from './Allcategories';
import { Pagination } from 'antd';

const AllProducts = () => {
    const { theme } = useContext(ThemeContext);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useSearchParams();
    const [textSearch, setTextSearch] = useState(search.get('q'));
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4); // Update the pageSize to 4

    const searchHandler = (e) => {
        setTextSearch(e.target.value);
        setSearch({ q: e.target.value });
    };

    const filterProduct = (product) => {
        if (search.get('q')) {
            return new RegExp(search.get('q'), 'i').test(product.title);
        } else {
            return true;
        }
    };

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.log('Произошла ошибка при получении данных товаров:', error));

        fetch('https://fakestoreapi.com/products/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.log('Произошла ошибка при получении данных категорий:', error));
    }, []);

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const filteredProducts = products
        .filter(product => categories.includes(product.category))
        .filter(filterProduct);

    const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div>
            <h1>Список всех товаров</h1>
            <hr />

            <input className={`SearchInput ${theme}`} type="text" value={textSearch} onChange={searchHandler} placeholder="Сортировать по названию:"/>

            <div className='ProductContainer'>
                {paginatedProducts.map(product => (
                    <Allcategories key={product.id} product={product} products={products} categories={categories} />
                ))}
            </div>

            <Pagination className='Pagination'
                current={currentPage}
                pageSize={pageSize}
                total={filteredProducts.length}
                onChange={handlePageChange}
            />
        </div>
    );
};

export default AllProducts;

