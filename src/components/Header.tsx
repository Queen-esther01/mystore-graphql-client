import Layout from './Layout'
import cart from '../assets/shopping-bag.png'
import { useReactiveVar } from '@apollo/client'
import { cartItemsVar, cartTotalVar } from '../utils/Cache'
import { Products } from '../utils/Interfaces'
import { Link } from 'react-router-dom'

function Header() {

    const cartItems = useReactiveVar<Products[]>(cartItemsVar)

    console.log(cartItems)
    

    return (
        <Layout>
            <div className="flex bg-white items-center justify-between py-5 md:py-6 lg:py-9">
                <h2 className='text-lg md:text-2xl'>Shop</h2>
                <Link to={{ pathname:'/', hash: '#categories'}}>
                    <h1 className='text-2xl md:text-4xl font-bold text-green-900'>MyStore.</h1>
                </Link>
                <Link to='/cart'>
                    <div className="w-8 h-8 md:w-11 md:h-11 relative">
                        <img src={cart} alt="cart" className='w-full'/>
                        {
                            cartItems.length !== 0 &&
                            <p className="absolute -top-1 md:top-0 left-3 md:left-5 bg-green-600 px-2 py-1 rounded-xl text-xs text-white">{cartItems.length}</p>
                        }
                    </div>
                </Link>
            </div>
        </Layout>
    )
}

export default Header