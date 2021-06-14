import {CartProductType} from "../types/CartProductType";

export const getProducts = async ():Promise<CartProductType[]> => {
    const products = await (await fetch('https://fakestoreapi.com/products')).json()
    return products
}