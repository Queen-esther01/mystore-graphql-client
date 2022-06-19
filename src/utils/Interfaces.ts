export interface Rating {
    count: number
}
export interface Products {
    id: string
    title: string
    price: number
    image: string
    quantity?: number
    description?: string
    category?: string
    rating?: Rating
}

export type Neumorphism = {
    boxShadow: string
    background: string
}

export type RemoveItemType = (id: string) => void

export type AddToCartType = (product: Products) => void

export interface AllProducts {
    allProducts: Products[]
}

export interface ByCategory {
    productsByCategory: Products[]
}

export interface SingleItem {
    product: Products
}
// export type RemoveItemType = (id: string) => (e: React.MouseEvent<HTMLButtonElement>) => void