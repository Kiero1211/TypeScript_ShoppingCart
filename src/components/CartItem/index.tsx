import { 
    Button, 
    Typography, 
    Box,
    Grid
} from "@material-ui/core";

// Types
import { CartItem as CartItemType } from "../../types/cart";

// Styles
import { Wrapper } from "./styles";

type CartItemProps = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
    item,
    addToCart,
    removeFromCart
}) => {
    return (
        <Wrapper>
            <Box sx={{flexGrow: 4, maxWidth: "400px"}}>
                <h3>{item.title}</h3>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Typography>Price: ${item.price.toFixed(2)}</Typography>
                    <Typography>Total: ${(item.price * item.amount).toFixed(2)}</Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Button 
                        size="small"
                        disableElevation
                        variant="contained"
                        onClick={() => removeFromCart(item.id)}
                    >
                        -
                    </Button>
                    <Typography>{item.amount}</Typography>
                    <Button 
                        size="small"
                        disableElevation
                        variant="contained"
                        onClick={() => addToCart(item)}
                    >
                        +
                    </Button>
                </Box>
            </Box>
            <Box sx={{flexGrow: 1}}>
                <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{
                        width: "100%",
                        height: "100%", 
                        objectFit: "cover",
                        float: "right"
                    }}
                />
            </Box>
        </Wrapper>
    )
}

export default CartItem;