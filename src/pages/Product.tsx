import React from 'react'
import Header from '../components/Header'
import back from '../assets/left.png'
import errorImage from '../assets/exclamation.png'
import { Link, useLocation, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { gql, useQuery } from '@apollo/client'
import { cartItemsVar, cartTotalVar } from '../utils/Cache'
import toast from 'react-hot-toast'
import { AddToCartType, AllProducts, Products, SingleItem } from '../utils/Interfaces'

export const GET_PRODUCT = gql`
    query Query($productId: ID!) {
        product(id: $productId) {
            title
            description
            image
            price
            category
            rating {
                count
            }
        }
    }
`

function Product() {
    let { id } = useParams()
    const { loading, error, data } = useQuery<SingleItem>(GET_PRODUCT, {
        variables: { productId: id }
    }) 
    console.log(data)
    const product = data?.product

    const addToCart:AddToCartType = (data: Products) => {
        let checkExistence = cartItemsVar().some(product => product.id === data.id)
        if(!checkExistence) {
            cartItemsVar([...cartItemsVar(), data])     
            toast.success('Successfully added to cart!', { id: 'cart-toast' })
            cartTotalVar(cartItemsVar().reduce((acc: number, curr: any) => {
                return acc + curr.price
            }, 0));
        }
        else {
            toast.error('Item already in cart!', { id: 'error-cart-toast' })
        }
    }

    return (
        <>
            <Header/>
            <Layout>
                <div className='text-green-900 my-10 md:mb-5 w-96 sm:w-4/5 md:w-4/5 lg:max-w-4xl'>
                    <Link to={{ pathname:'/', hash: '#categories'}}>
                        <div className="flex items-center w-6 h-6">
                            <img src={back} alt="back" className='w-full'/>
                            <span>back</span>
                        </div>
                    </Link>
                </div>
                {
                    error &&
                    <div className='my-32'>
                        <div className="w-20 h-20 mx-auto">
                            <img src={errorImage} alt="error" className='w-full h-full'/>
                        </div>
                        <p className='text-center mt-5 text-lg md:max-w-sm md:mx-auto'>Apologies, our server is currently down and undergoing maintenance. We wil be back soon. Thank you for your patience.</p>
                    </div>
                }
                {loading && <div className="grid grid-cols-1 md:grid-cols-2 lg:flex md:gap-10 lg:justify-around m-auto">
                    <div className="animate-pulse bg-gray-200 w-96 md:w-full m-auto lg:w-96 h-72 lg:h-60 xl:h-72"></div>
                    <div className="  my-10 md:my-0 w-96 md:w-full lg:w-2/4 m-auto ">
                        <h2 className="animate-pulse bg-gray-200 py-6"></h2>
                        <p className='animate-pulse bg-gray-200 py-2 my-3'></p>
                        <p className='animate-pulse bg-gray-200 py-20 my-3'></p>
                        <p className='animate-pulse bg-gray-200 py-2 my-3'></p>
                        <p className='animate-pulse bg-gray-200 py-2 my-3'></p>
                        <button className="animate-pulse bg-gray-200 py-5 my-3 w-full"></button>
                    </div>
                </div>}
                {product && <div className="grid grid-cols-1 md:grid-cols-2 lg:flex md:gap-10 lg:justify-around m-auto">
                    <div className="w-96 md:w-full m-auto lg:w-96 h-72 lg:h-60 xl:h-72">
                        <img src={product?.image} alt="shoes" className='object-contain object-center w-full h-full'/>
                    </div>
                    <div className="my-10 md:my-0 w-96 md:w-full lg:w-2/4 m-auto ">
                        <h2 className="text-green-900 text-2xl font-semibold">{product?.title}</h2>
                        <p className='py-5 text-light-green border-b border-gray-300'>${product?.price}</p>
                        <p className='font-medium py-5'>{product?.description}</p>
                        <p className='pb-5'>Category: <span className="font-semibold text-green-900">{product?.category}</span></p>
                        <p className='pb-5'>No in stock: <span className="font-semibold text-green-900">{product?.rating?.count}</span></p>
                        <button onClick={()=>addToCart(product!)} className="border border-green-900 text-green-900 w-full py-2 text-xl my-5">Add to cart</button>
                    </div>
                </div>}
            </Layout>
        </>
    )
}

export default Product