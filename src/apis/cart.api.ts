import axios from "../axios/index";
import { CartItem } from "../types/cart";

export const getProducts = () => axios.get<CartItem[]>("/");