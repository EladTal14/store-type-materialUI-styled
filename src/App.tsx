import React, {useState} from 'react'
import {useQuery} from 'react-query'
import Drawer from "@material-ui/core/Drawer";
import Grid from '@material-ui/core/Grid'
import {StyledButton, Wrapper} from './App.styles'
import {getProducts} from "./services/api";
import {CartProductType} from "./types/CartProductType";
import {Product} from "./components/products/Product";
import Badge from "@material-ui/core/Badge";
import {AddShoppingCart} from "@material-ui/icons";
import {Cart} from "./components/cart/Cart";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App = () => {
    const [cartOpen, setCartOpen] = useState(false)
    const [cartProducts, setCartProducts] = useState([] as CartProductType[])
    const {data, isLoading, error} = useQuery<CartProductType[]>('products', getProducts)
    const [productAdded, setProductAdded] = useState(false)
    const [productRemoved, setProductRemoved] = useState(false)

    const getTotalProducts = (cartProducts: CartProductType[]) => {
        return cartProducts.reduce((acc: number, cartProduct) => {
            return acc + cartProduct.amount
        }, 0)
    }
    const handleAddToCart = (clickedProduct: CartProductType) => {
        setCartProducts(prev => {
            const isItemInCart = prev.findIndex(product => product.id === clickedProduct.id)
            if (isItemInCart >= 0) {
                const newItem = prev[isItemInCart]
                newItem.amount++
                prev[isItemInCart] = newItem
                return [...prev]
            } else {
                return [...prev, {...clickedProduct, amount: 1}]
            }
        })
        setProductRemoved(false)
        setProductAdded(true)
    }
    const handleRemoveFromCart = (productId: number) => {
        setCartProducts(prev => {
                return prev.reduce((acc, product) => {
                    if (product.id === productId) {
                        if (product.amount === 1) return acc
                        return [...acc, {...product, amount: product.amount - 1}]
                    } else {
                        return [...acc, product]
                    }
                }, [] as CartProductType[])
            }
        )
        setProductAdded(false);
        setProductRemoved(true)
    }
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setProductAdded(false);
        setProductRemoved(false)
    };
    if (isLoading) return (
        <Backdrop open={isLoading} onClick={handleClose}>
            <CircularProgress color="inherit"/>
        </Backdrop>)
    if (error) return <div>something went wrong</div>
    return (
        <Wrapper>
            <Snackbar open={productAdded} anchorOrigin={{vertical: 'top', horizontal: 'left'}} autoHideDuration={3000}
                      onClose={handleClose}>
                <Alert severity="success">
                    Product added
                </Alert>
            </Snackbar>
            <Snackbar open={productRemoved} anchorOrigin={{vertical: 'top', horizontal: 'left'}} autoHideDuration={3000}
                      onClose={handleClose}>
                <Alert severity="warning">
                    Product removed
                </Alert>
            </Snackbar>
            <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart cartProducts={cartProducts} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalProducts(cartProducts)} color="error"/>
                <AddShoppingCart/>
            </StyledButton>
            <Grid container spacing={3}>
                {data?.map(product => (
                    <Grid item key={product.id} xs={12} sm={4}>
                        <Product product={product} handleAddToCart={handleAddToCart}/>
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    );
}

export default App;
