import { InMemoryCache, makeVar } from "@apollo/client"
import { Products } from "./Interfaces"

export const cartItemsVar = makeVar<Products[]>([])
export const cartTotalVar = makeVar<number>(0)


export const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				cartItems: {
					read() {
						return cartItemsVar()
					}
				},
				cartTotal: {
					read() {
						return cartTotalVar()
					}
				}
			}
		}
	}
})