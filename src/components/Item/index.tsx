import { 
    Button,
    Typography,
    Box
} from "@material-ui/core";

// Types
import { CartItem } from "../../types/cart";

//Styles 
import { Wrapper } from "./styles";

type ItemProps = {
    item: CartItem;
    handleAddToCart: (clickedItem: CartItem) => void;
}

const Item: React.FC<ItemProps> = ({item, handleAddToCart}) => (
    <Wrapper>
        <img src={item.image} alt={item.title} />
        <Box sx={{p: "1rem", height: "100%"}}>
            <Typography variant="h3">{item.title}</Typography>
            <Typography>{item.description}</Typography>
            <Typography variant="h3">$ {item.price}</Typography>
        </Box>
        <Button onClick={() => handleAddToCart(item)}>Add To Cart</Button>
    </Wrapper>
)

export default Item;