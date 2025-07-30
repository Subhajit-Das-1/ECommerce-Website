import React from "react";
import { ButtonGroup, Button, styled } from "@mui/material";
import { useDispatch } from 'react-redux';
import { updateCartItemQuantity } from '../../redux/actions/cartActions';

const Component = styled(ButtonGroup)`
    margin-top: 30px;
`;

const StyledButton = styled(Button)`
    border-radius: 50%;
`;

const GroupedButton = ({ item }) => {
    const dispatch = useDispatch();
    const quantity = item.quantity || 1;

    const handleIncrement = () => {
        dispatch(updateCartItemQuantity(item.id, quantity + 1));
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            dispatch(updateCartItemQuantity(item.id, quantity - 1));
        }
    };

    return (
        <Component>
            <StyledButton onClick={handleDecrement} disabled={quantity <= 1}>-</StyledButton>
            <Button disabled>{quantity}</Button>
            <StyledButton onClick={handleIncrement}>+</StyledButton>
        </Component>
    );
}

export default GroupedButton;