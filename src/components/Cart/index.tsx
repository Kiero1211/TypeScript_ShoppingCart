import { Button } from "@material-ui/core";
import CartItem from "../CartItem";
// Types
import { CartItem as CartItemType } from "../../types/cart";

// Styles
import { Wrapper } from "./styles";

type CartProps = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({
    cartItems,
    addToCart,
    removeFromCart
}) => {
    const calculateTotalPrice = (items: CartItemType[]) => {
        return items.reduce((totalPrice, item) => totalPrice + (item.amount * item.price), 0).toFixed(2);
    }
    return (
        <Wrapper>           
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>No items in cart</p> : null}
            {cartItems.map((item, index) => (
                <CartItem 
                    key={index} 
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
            <h2>Total: ${calculateTotalPrice(cartItems)}</h2>
        </Wrapper>
    )
}

export default Cart;