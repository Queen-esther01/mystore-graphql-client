import { createContext } from "react";
import { Products } from "./Interfaces";


export const AppContext = createContext<Products | null>(null)