import React from "react";
import Button from "@material-ui/core/Button";
import {CartProductType} from '../../../types/CartProductType'
import {Wrapper} from "./CartProduct.styles";

type Props = {
    product: CartProductType
    addToCart: (clickedProduct: CartProductType) => void
    removeFromCart: (id: number) => void
}

export const CartProduct: React.FC<Props> = ({product, removeFromCart, addToCart}) => {
    return (
        <Wrapper>
            <div>
                <h3>{product.title}</h3>
                <div className="info">
                    <p>Price: ${product.price}</p>
                    <p>Total: ${(product.price * product.amount).toFixed(2)}</p>
                </div>
                <div className="actions">
                    <Button size="small" disableElevation variant="contained"
                            onClick={() => removeFromCart(product.id)}>-</Button>
                    <p>{product.amount}</p>
                    <Button size="small" disableElevation variant="contained"
                            onClick={() => addToCart(product)}>+</Button>
                </div>
            </div>
            <img src={product.image} alt={product.title}/>

        </Wrapper>

    )
}