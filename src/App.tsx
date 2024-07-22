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
import { AddShoppingCart } from "@material-ui/icons";

// Styles
import { Wrapper } from "./App.styles";
import { CartItem } from "./types/cart";

function App() {
  const {data: productList, isLoading, isError} = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        return await getProducts();
      },
  })

  console.log(productList);
  

  const hanldeAddToCart = (clickedItem: CartItem): void => {

  }

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return <Typography variant="h1">Something went wrong!</Typography>
  }
  
  return (
    <Wrapper>
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
