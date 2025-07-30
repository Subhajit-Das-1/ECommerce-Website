import { useState, useEffect } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { InputBase, List, ListItem, Box, styled } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';

const SearchContainer = styled(Box)`
  border-radius: 2px;
  margin-left: 10px;
  width: 38%;
  background-color: ${props => props.theme.palette.background.paper};
  display: flex;
  border: ${props => props.theme.palette.mode === 'dark' ? '1px solid #1e293b' : '1px solid #f0f0f0'};
`;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: blue;
`;

const ListWrapper = styled(List)`
  position: absolute;
  color: ${props => props.theme.palette.text.primary};
  background: ${props => props.theme.palette.background.paper};
  margin-top: 36px;
  border: ${props => props.theme.palette.mode === 'dark' ? '1px solid #1e293b' : '1px solid #f0f0f0'};
  border-radius: ${props => props.theme.palette.mode === 'dark' ? '4px' : '0'};
`;

const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 20px;
`;

const Search = () => {
    const [ text, setText ] = useState();
    const [ open, setOpen ] = useState(true)

    const getText = (text) => {
        setText(text);
        setOpen(false)
    }

    const getProducts = useSelector(state => state.getProducts);
    const { products } = getProducts;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    // Handle search safely
    const handleSearch = () => {
        try {
            if (!products || !Array.isArray(products)) {
                return [];
            }
            return products.filter(product => 
                product && 
                product.title && 
                product.title.longTitle && 
                product.title.longTitle.toLowerCase().includes(text.toLowerCase())
            );
        } catch (error) {
            console.log('Search error:', error);
            return [];
        }
    }

    return (
        <SearchContainer>
            <InputSearchBase
              placeholder="Search for products, brands and more"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => getText(e.target.value)}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            {
              text && 
              <ListWrapper hidden={open}>
                {
                  handleSearch().map(product => (
                    <ListItem key={product.id}>
                      <Link 
                        to={`/product/${product.id}`} 
                        style={{ textDecoration:'none', color:'inherit'}}
                        onClick={() => setOpen(true)}  
                      >
                        {product.title?.longTitle || 'Product'}
                      </Link>
                    </ListItem>
                  ))
                }  
              </ListWrapper>
            }
        </SearchContainer>
    )
}

export default Search;