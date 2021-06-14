import Button from "@material-ui/core/Button";
import {CartProductType} from "../../types/CartProductType";
import {Wrapper} from "./Product.styles";
import React from "react";

type Props = {
    product: CartProductType
    handleAddToCart: (clickItem: CartProductType) => void
}
export const Product: React.FC<Props> = ({product, handleAddToCart}) => {
    return (
        <Wrapper>
            <img src={product.image} alt={product.title}/>
            <div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <h3>${product.price}</h3>
            </div>
            <Button onClick={() => handleAddToCart(product)}>Add To Cart</Button>
        </Wrapper>
    )
}