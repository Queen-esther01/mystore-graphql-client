import { gql, useQuery, useReactiveVar } from '@apollo/client'
import Header from '../components/Header'
import { cartItemsVar, cartTotalVar } from '../utils/Cache'
import { Neumorphism, Products, RemoveItemType } from '../utils/Interfaces'
import cart from '../assets/shopping-cart.png'
import trash from '../assets/delete.png'
import { Link } from 'react-router-dom'
import back from '../assets/left.png'
import Layout from '../components/Layout'


const Cart = () => {
    const cartTotal = useReactiveVar<number>(cartTotalVar)
    console.log(cartTotal)

    const cartItems = useReactiveVar<Products[]>(cartItemsVar)
    console.log(cartItems)

    const neumorphism:Neumorphism = {
        background: '#fff',
        boxShadow:  `20px 20px 60px #dcdcdc,
             -20px -20px 60px #ffffff`
    }

    const removeFromCart:RemoveItemType = (id: string) => {
        let filtered = cartItems.filter((item: Products) => item.id !== id)
        cartItemsVar(filtered)
    }

    return (
        <>
            <Header/>
            <Layout>
                <Link to={{ pathname:'/', hash: '#categories'}}>
                    <div className="flex items-center w-6 h-6 mb-10 mt-5">
                        <img src={back} alt="back" className='w-full'/>
                        <span>back</span>
                    </div>
                </Link>
            </Layout>
            {
                cartItems.length === 0 ?
                <div className="">
                    <div className="w-24 h-24 mx-auto">
                        <img src={cart} alt="cart" className='w-full text-gray-200'/>
                    </div>
                    <h1 className="text-center text-2xl text-gray-500 mt-5">Your cart is empty</h1>
                </div> :
                <div className='mt-10 mb-36 layout w-96 sm:w-4/5 md:w-4/5 lg:max-w-4xl xl:max-w-6xl mx-auto'>
                    <h2 className='text-gray-900 mb-5 text-right'>My cart total ({cartItems.length})</h2>
                    {
                        cartItems.map(item => (
                            <div key={item.id} style={neumorphism} className='p-4 my-5 relative'>
                                <div className="flex gap-5">
                                    <div className="w-20 h-20">
                                        <img src={item.image} alt="shoes" className='w-full h-full object-contain'/>
                                    </div>
                                    <div>
                                        <h3 className='text-xs lg:text-base'>{item.title}</h3>
                                        <p className='font-semibold mt-2'>${item.price}</p>
                                    </div>
                                </div>
                                <div onClick={()=>removeFromCart(item.id)} className="w-5 h-5 cursor-pointer absolute right-5 lg:right-20 top-20 lg:flex lg:gap-1">
                                    <img src={trash} alt="trash" className='w-full'/>
                                    <p className='hidden lg:block text-red-400'>Delete</p>
                                </div>
                            </div>
                        ))
                    }
                    <button className="w-full text-center bg-green-900 mt-5 text-white py-3">Checkout (${cartTotal.toLocaleString('en')})</button>
                </div>
            }
        </>
    )
}

export default Cart