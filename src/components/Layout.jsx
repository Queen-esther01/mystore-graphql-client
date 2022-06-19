import React from 'react'

function Layout({ children}) {
    return (
        <>
            <div className='w-96 sm:w-4/5 md:w-4/5 lg:max-w-4xl xl:max-w-6xl m-auto layout'>
                {children}
            </div>
        </>
    )
}

export default Layout