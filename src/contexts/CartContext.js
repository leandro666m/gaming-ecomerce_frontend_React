import {createContext, useEffect, useState} from "react";
import {addToCart, changeQuantity, deleteAll, deleteGame, getAllCart, getCountCart} from '@/api'



export const CartContext = createContext();

export const CartProvider = ( props ) => {

    const {children} = props
    const [cart, setCart] = useState(null)
    const [total, setTotal] = useState( getCountCart() )


    useEffect(()=>{
       setCart( getAllCart() )
    },[]    )

    const addCart = (gameId) => {
        addToCart(gameId)
        refreshTotalCart()
    }

    const refreshTotalCart = () => {
        setTotal( getCountCart() )
        setCart( getAllCart() )
    }

    const changeQuantityItem = (gameId, quantity) => {
        changeQuantity(gameId, quantity)
        refreshTotalCart()
    }

    const deleteItem = (gameId) => {
        deleteGame(gameId)
        refreshTotalCart()
    }

    const deleteAllItems = () => {
        deleteAll()
        refreshTotalCart()
    }

    const data = {
        cart,
        addCart,
        total,
        deleteItem,
        deleteAllItems,
        changeQuantityItem,
    }

    return  <CartContext.Provider value={data}> {children} </CartContext.Provider>

}