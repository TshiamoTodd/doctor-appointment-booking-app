import Image from 'next/image'
import React from 'react'

function Header() {
    const menu = [
        {
            id: 1,
            name: 'Home',
            path: '/'
        },
        {
            id: 2,
            name: 'Explore',
            path: '/'
        },
        {
            id: 3,
            name: 'Contact Us',
            path: '/'
        }
    ];

    return (
        <div>
            <div className='flex items-center gap-10'>
                <Image 
                    src="/logo.svg" 
                    alt="logo"
                    width={180}
                    height={80}
                />
                <ul className='md:flex gap-8 hidden'>
                    {menu.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Header