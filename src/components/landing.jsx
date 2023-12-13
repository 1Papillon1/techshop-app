import React from 'react';

function Landing() {
    return (
        <div className='layout'>
            <div className='flex'>

                <div className='flex__box flex__box--primary'>

                    <div className='card'>
                        <h1 className='card__title'>Find the Best Electronic Products</h1>
                        <h2 className='card__subtitle'>Highest quality 
                        electronic products. Explore our Shop and find the best desktop, 
                        laptop, keyboard, mouse and headphones.</h2>
                        <a className='button button--secondary'>Top Rated</a>
                        <a className='button button--primary'>Browse Products</a>
                    </div>

                </div>

                <div className='flex__box flex__box--secondary'>
                    <span className='caption'>Image by <a className='caption__link' href="https://www.freepik.com/free-photo/view-neon-illuminated-gaming-desk-setup-with-keyboard_29342775.htm#page=2&query=electronics%20dark&position=23&from_view=search&track=ais&uuid=27347e64-3c52-4a02-a1de-0d858ddd2d0d">Freepik</a></span>
                </div>

            </div>

           

        </div>
    )
}

export default Landing;