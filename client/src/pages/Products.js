import React, { useContext, useEffect, memo, useState } from 'react';
import { Link } from 'react-router-dom'

import { ProductsContext, ProductsProvider } from '../contexts/products.context';
import { AuthContext } from '../contexts/auth.context';

import useToggle from '../hooks/useToggle';

import AddProduct from '../components/modals/AddProduct'
import ProductCard from '../components/ProductCard'
import PageHeader from '../components/layout/PageHeader';
import PageContainer from '../components/layout/PageContainer';

import '../styles/Products.scss'

const Products = (props) => {

    const { getProducts, products, addProduct, loading, isFetching, sortAZ, sortZA, sortProductsAZ } = useContext(ProductsContext)
    const [addProductShowing, toggleAddProduct] = useToggle(false);
    const {checkAuth} = useContext(AuthContext);

    useEffect(() => {
        loading();
        getProducts();
    }, [])

    const sortBtn = () => {
        if (!sortProductsAZ) {
            return <i onClick={sortAZ} class="fas fa-sort-alpha-up"></i>
        } else {
            return <i onClick={sortZA} class="fas fa-sort-alpha-up-alt"></i>
        }
    }

    return (
        <PageContainer>
            <PageHeader title="Products" />
            <div className="productControls">
                <p>Sort by:</p>
                {sortBtn()}
            </div>
            <div className="products">
                {products.map(product => (
                    <Link className="productLink" to={`/products/${product.id}`}>
                        <ProductCard key={product.id} name={product.product_name} sku={product.SKU} qty={product.qty} category={product.category} />
                    </Link>
                ))}
            </div>
            {/* <AddProduct show={addProductShowing} onHide={toggleAddProduct}/> */}
        </PageContainer>
    );
}

export default memo(Products);
