import {Wrapper} from "./Cart.styles";
import {CartProductType} from "../../types/CartProductType";
import React from "react";
import {CartProduct} from '../cart/cartProduct/CartProduct'

type Props = {
    cartProducts: CartProductType[]
    addToCart: (clickedProduct: CartProductType) => void
    removeFromCart: (id: number) => void
}
export const Cart: React.FC<Props> = ({cartProducts, addToCart, removeFromCart}) => {
    const calculateTotal = (products: CartProductType[]) => {
        return  products.reduce((acc: number, product) => {
            return acc + product.amount * product.price
        }, 0)
    }
    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {!cartProducts.length ? <p>No Items in cart yet.</p> : null}
            {cartProducts.map(product => {
                return (
                    <CartProduct
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    />)
            })}
            <h3>Total: ${calculateTotal(cartProducts).toFixed(2)}</h3>
        </Wrapper>
    )
}