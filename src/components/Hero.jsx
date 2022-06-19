import React from 'react'
import shoes from '../assets/shoes.jpg'
import blueshoes from '../assets/blueshoes.jpg'

function Hero() {
    return (
        <>
            <div className="hero md:w-4/5 lg:max-w-4xl xl:max-w-6xl m-auto">
                <img src={shoes} alt="shoes" className="h-full w-full object-cover object-center md:hidden"/>
                <img src={blueshoes} alt="shoes" className="h-full w-full object-cover object-center hidden md:block"/>
                <div className=" mt-6 lg:mt-8 text-center">
                    <button className='border border-green-900 py-2 px-10 md:px-14 text-2xl font-bold text-green-900'>Shop now</button>
                </div>
            </div>
            <div className="bg-green-700 mt-44 text-center py-6 md:text-2xl">
                <p className="text-white">Up to 30% off for first time buyers!</p>
            </div>
        </>
    )
}

export default Hero