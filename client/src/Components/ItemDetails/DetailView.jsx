import { useEffect } from 'react';

import { styled, Box, Typography, Grid } from '@mui/material';

import ProductDetail from './ProductDetail';
import ActionItem from './ActionItem';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getProductDetails } from '../../redux/actions/productActions';

const Component = styled(Box)`
    margin-top: 55px;
    background: ${props => props.theme.palette.background.default};
    min-height: 100vh;
`;

const Container = styled(Grid)(({ theme }) => ({
    background: theme.palette.background.paper,
    display: 'flex',
    border: theme.palette.mode === 'dark' ? '1px solid #1e293b' : 'none',
    borderRadius: theme.palette.mode === 'dark' ? '8px' : '0',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}))

const RightContainer = styled(Grid)`
    margin-top: 50px;
    & > p {
        margin-top: 10px;
    }
`;

const DetailView = () => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
    
    const { id } = useParams();

    const { product } = useSelector(state => state.getProductDetails);

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(id) {
            dispatch(getProductDetails(id));
        }
    }, [dispatch, id]);

    return (
        <Component>
            {product && Object.keys(product).length > 0 ? (
                <Container container> 
                    <Grid item lg={4} md={4} sm={8} xs={12}>
                        <ActionItem product={product} />
                    </Grid>
                    <RightContainer item lg={8} md={8} sm={8} xs={12}>
                        <Typography>{product.title?.longTitle}</Typography>
                        <Typography style={{marginTop: 5, color: '#878787', fontSize: 14 }}>
                            8 Ratings & 1 Reviews
                            <span><img src={fassured} style={{width: 77, marginLeft: 20}} alt="Fassured" /></span>
                        </Typography>
                        <Typography>
                            <span style={{ fontSize: 28 }}>₹{product.price?.cost}</span>&nbsp;&nbsp;&nbsp; 
                            <span style={{ color: '#878787' }}><strike>₹{product.price?.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                            <span style={{ color: '#388E3C' }}>{product.price?.discount} off</span>
                        </Typography>
                        <ProductDetail product={product} />
                    </RightContainer>
                </Container>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <Typography>Product not found</Typography>
                </Box>
            )}   
        </Component>
    )
}

export default DetailView;