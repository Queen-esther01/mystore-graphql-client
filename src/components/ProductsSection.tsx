import React, { useEffect, useState } from 'react'
import cart from '../assets/add.png'
import errorImage from '../assets/exclamation.png'
import { Link } from 'react-router-dom'
import { gql, useQuery, useLazyQuery, ApolloError } from '@apollo/client'
import { AddToCartType, AllProducts, ByCategory, Neumorphism, Products } from '../utils/Interfaces'
import { cartItemsVar, cartTotalVar } from '../utils/Cache'
import toast from 'react-hot-toast'
// import { LoadingSpinner } from '@apollo/space-kit/Loaders/LoadingSpinner';

const GET_ALL_PRODUCTS = gql`
    query allProducts {
        allProducts {
            id
            title
            price
            image
        }
    }
`

const GET_PRODUCTS_BY_CATEGORY = gql`
    query ProductsByCategory($category: String!) {
        productsByCategory(category: $category) {
            title
            id
            price
            image
        }
    }
`



function ProductsSection() {
    const [active, setActive] = useState<String>('All')
    const [products, setProducts] = useState<Products[]>()
    const categories: string[] = ['All', 'Electronics', 'Jewelery', "Men's Clothing", "Women's Clothing"]
    

    const sticky:React.CSSProperties = {
        position: 'sticky',
        top: '0',
    }

    const neumorphism:Neumorphism = {
        background: '#fff',
        boxShadow:  `20px 20px 60px #dcdcdc,
             -20px -20px 60px #ffffff`
    }

    const { loading, error, data } = useQuery<AllProducts>(GET_ALL_PRODUCTS)

    useEffect(() => {
        if (data && !products) {
            setProducts(data.allProducts)
        }
    }, [data])
    

    const [getProductsByCategory, { loading: loadingByCategory, error: errorByCategory, data: dataByCategory }] = useLazyQuery<ByCategory>(GET_PRODUCTS_BY_CATEGORY)
    console.log(dataByCategory)
    useEffect(() => {
        if(dataByCategory) setProducts(dataByCategory.productsByCategory)
    }, [dataByCategory])
    
    const setActiveCategory = (category: string) =>{
        setActive(category)
        getProductsByCategory({ variables: { category: category.toLowerCase()}})
    }

    let checkExistence
    const addToCart:AddToCartType = (item: Products) => {
        checkExistence = cartItemsVar().some(product => product.id === item.id)
        if(!checkExistence) {
            cartItemsVar([...cartItemsVar(), item])     
            toast.success('Successfully added to cart!', { id: 'cart-toast' })
            cartTotalVar(cartItemsVar().reduce((acc: number, curr: any) => {
                return acc + curr.price
            }, 0));
        }
        else {
            toast.error('Item already in cart!', { id: 'error-cart-toast' })
        }
    }

    if(error){
        return (
            <>
                <div className='my-32'>
                    <div className="w-20 h-20 mx-auto">
                        <img src={errorImage} alt="error" className='w-full h-full'/>
                    </div>
                    <p className='text-center mt-5 text-lg max-w-sm mx-auto'>Apologies, our server is currently down and undergoing maintenance. We wil be back soon. Thank you for your patience.</p>
                </div>
            </>
        )
    }
    return (
        <div className='xl:flex xl:justify-center xl:max-w-7xl xl:mx-auto'>
            <div style={sticky} className="hidden xl:block my-10 bg-green-50 p-4 h-64">
                <form>
                    {
                        categories.map(category => (
                            <div key={category} className="flex items-center gap-3 my-3">
                                <input onClick={()=>getProductsByCategory({ variables: { category: category.toLowerCase()}})} type="radio" name="categories" value={`${category}`} id="" />
                                <label htmlFor="categories">{category}</label>
                            </div>
                        ))
                    }
                </form>
            </div>
            <div style={sticky} className="py-10 bg-white justify-center xl:hidden mt-10 w-96 sm:w-4/5 md:w-4/5 lg:max-w-4xl flex mx-auto flex-wrap gap-10 layout">
                {
                    categories.map(category => (
                        <p id='categories' key={category} onClick={()=>setActiveCategory(category)} className={`${active === category && 'text-green font-semibold'} cursor-pointer text-center`}>{category}</p>
                    ))
                }
            </div>
            {
                loading || loadingByCategory ? <div className='grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between mt-10 mb-20 md:w-4/5 lg:max-w-4xl xl:max-w-6xl gap-10 xl:gap-0 mx-auto'>
                            {
                                [1,2,3].map(item => (
                                    <div key={item}>
                                        <div className="animate-pulse w-96 h-60 bg-gray-200 md:w-72 lg:w-64 xl:w-80 m-auto layout"></div>
                                    </div>
                                ))
                            }
                        </div>
                    :
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 mb-20 gap-10 md:gap-0 lg:gap-10 mx-auto md:w-4/5 lg:max-w-5xl'>
                    {
                        products?.map((item: any, index: number) => (
                            <div key={index}  style={neumorphism} className=' px-5 w-96 md:w-72 mb-10 h-96 lg:h-80 xl:h-96 lg:w-64 xl:w-80 m-auto layout'>
                                <div className="">
                                    <Link to={`/product/${item.id}`}>
                                        <div className='h-72 lg:h-60 xl:h-72 pt-10'>
                                            <img src={item.image} alt="shoes" className='w-full h-full object-contain object-center'/>
                                        </div>
                                    </Link>
                                    <div className="flex justify-between mt-3">
                                        <div className='my-3 w-56'>
                                            <p className='text-green-900 text-lg font-semibold'>{item.title.length > 20 ? item.title.substring(0, 15) + '...' : item.title}</p>
                                            <p className='font-light'>${item.price}</p>
                                        </div>
                                        <div className="cursor-pointer w-8 h-8 mt-3">
                                            <img onClick={()=>addToCart(item)} src={cart} alt="cart" className='w-full'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default ProductsSection