import { useState } from "react";
import { useQuery } from "react-query";
import { getProducts } from "./apis/cart.api";

// Components
import Item from "./components/Item";
import { 
  Drawer,
  LinearProgress,
  Grid,
  Badge,
  Typography
} from "@material-ui/core";
import { AddShoppingCart, Category } from "@material-ui/icons";
import Cart from "./components/Cart";

// Styles
import { Wrapper, StyledButton } from "./App.styles";
import { CartItem } from "./types/cart";
import { title } from "process";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItem[])

  const {data: productList, isLoading, isError} = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        return await getProducts();
      },
  })
  

  const hanldeAddToCart = (clickedItem: CartItem): void => {
    setCartItems(prev => {
      const itemInCart = cartItems.find(item => item.id === clickedItem.id);

      if (itemInCart) {
        return prev.map(item => (
          item.id === clickedItem.id 
          ? {...item, amount: item.amount + 1}
          : item
        ))
      }
    
      const newItem: CartItem = {...clickedItem, amount: 1};
      return [...prev, newItem]
    });
  }

  const getTotalItems = (items: CartItem[]) => items.reduce((total, item) => total + item.amount, 0);

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.reduce(
      (cart, item) => {
        if (item.id !== id) {
          return [...cart, item];
        } 
        
        if (item.amount === 1) {
          return cart;
        }

        return [...cart, {...item, amount: item.amount - 1}];
      }, [] as CartItem[]
    ));
  }

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return <Typography variant="h1">Something went wrong!</Typography>
  }
  
  return (
    <Wrapper>
      <Drawer 
        open={isCartOpen} 
        anchor="right" 
        onClose={() => setIsCartOpen(false)}
      >
        <Cart 
          cartItems={cartItems} 
          addToCart={hanldeAddToCart} 
          removeFromCart={handleRemoveFromCart} 
        />
      </Drawer>
      <StyledButton onClick={() => setIsCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart/>
        </Badge>
      </StyledButton>

      <Grid container spacing={3}>
        {productList?.map((item: CartItem, index: number) => (
          <Grid item key={index} xs={12} sm={4}>
            <Item item={item} handleAddToCart={hanldeAddToCart}/>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
