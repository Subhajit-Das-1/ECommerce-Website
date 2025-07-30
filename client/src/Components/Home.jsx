import React,  { useEffect } from 'react';

import { Box, styled } from '@mui/material';

import NavBar from './Home/NarBar';
import Banner from './Home/Banner';
import MidSlide from './Home/MidSlide';
import MidSection from './Home/MidSection';
import Slide from './Home/Slide';

import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts } from '../redux/actions/productActions';

const Component = styled(Box)`
    padding: 20px 10px;
    background: ${props => props.theme.palette.background.default};
    min-height: 100vh;
`;

const Home = () => {
    const getProducts = useSelector(state => state.getProducts);
    const { products, error } = getProducts;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    // Show loading or error state
    if (error) {
        console.log('Error loading products:', error);
    }

    return (
        <>
            <NavBar />
            <Component>
                <Banner />
                <MidSlide products={products} />
                <MidSection />
                <Slide
                    data={products || []} 
                    title='Discounts for You'
                    timer={false} 
                    multi={true} 
                />
                <Slide
                    data={products || []} 
                    title='Suggested Items'
                    timer={false} 
                    multi={true} 
                />
                <Slide
                    data={products || []} 
                    title='Top Selection'
                    timer={false} 
                    multi={true} 
                />
                <Slide
                    data={products || []} 
                    title='Recommended Items'
                    timer={false} 
                    multi={true} 
                />
            </Component>
        </>
    )
}

export default Home;