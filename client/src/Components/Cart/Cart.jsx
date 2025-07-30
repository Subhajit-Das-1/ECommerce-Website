import { useEffect } from 'react';

import { Box, Typography, Button, Grid, styled } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';

import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';

import { post } from '../../utils/paytm';
import { payUsingPaytm } from '../../service/api';

const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0'
    }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('sm')]: {
        marginBottom: 15
    }
}));

const Header = styled(Box)(({ theme }) => ({
    padding: '15px 24px',
    background: theme.palette.background.paper,
    borderBottom: theme.palette.mode === 'dark' ? '1px solid #1e293b' : '1px solid #f0f0f0',
}));

const BottomWrapper = styled(Box)(({ theme }) => ({
    padding: '16px 22px',
    background: theme.palette.background.paper,
    boxShadow: theme.palette.mode === 'dark' ? '0 -2px 10px 0 rgba(0,0,0,0.3)' : '0 -2px 10px 0 rgb(0 0 0 / 10%)',
    borderTop: theme.palette.mode === 'dark' ? '1px solid #1e293b' : '1px solid #f0f0f0',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    marginLeft: 'auto',
    background: theme.palette.mode === 'dark' ? 'linear-gradient(to right, #3b82f6, #8b5cf6)' : '#fb641b',
    color: '#fff',
    borderRadius: '2px',
    width: '250px',
    height: '51px',
    '&:hover': {
        background: theme.palette.mode === 'dark' ? 'linear-gradient(to right, #2563eb, #7c3aed)' : '#e55a17',
    },
}));

const Cart = () => {
    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    const { id } = useParams();

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(cartItems && id !== cartItems.id)   
            dispatch(addToCart(id));
    }, [dispatch, cartItems, id]);

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    const buyNow = async () => {
        let response = await payUsingPaytm({ amount: 500, email: 'kunaltyagi@gmail.com'});
        var information = {
            action: 'https://securegw-stage.paytm.in/order/process',
            params: response    
        }
        post(information);
    }

    return (
        <>
        { cartItems.length ? 
            <Component container>
                <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                    <Header>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Cart ({cartItems?.reduce((total, item) => total + (item.quantity || 1), 0)})</Typography>
                    </Header>
                        {   cartItems.map(item => (
                                <CartItem key={item.id} item={item} removeItemFromCart={removeItemFromCart}/>
                            ))
                        }
                    <BottomWrapper>
                        <StyledButton onClick={() => buyNow()} variant="contained">Place Order</StyledButton>
                    </BottomWrapper>
                </LeftComponent>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView cartItems={cartItems} />
                </Grid>
            </Component> : <EmptyCart />
        }
        </>

    )
}

export default Cart;