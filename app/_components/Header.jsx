'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LoginLink, LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image'
import Link from 'next/link';
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
            path: '/explore'
        },
        {
            id: 3,
            name: 'Contact Us',
            path: '/contact'
        }
    ];

    const {user} = useKindeBrowserClient(); 

    return (
        <div className='flex items-center justify-between p-4 shadow-sm'>
            <div className='flex items-center gap-10'>
                <Link href={'/'}>
                    <Image 
                        src="/logo.svg" 
                        alt="logo"
                        width={180}
                        height={80}
                    />
                </Link>
                <ul className='md:flex gap-8 hidden'>
                    {menu.map((item, index) => (
                        <Link href={item.path} key={index}>
                            <li 
                                className='hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out'
                            >
                                {item.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>

            {user ? 
                <Popover>
                    <PopoverTrigger>
                        <Image 
                            src={user?.picture} 
                            alt="profile"
                            width={50}
                            height={50}
                            className='rounded-full'
                        />
                    </PopoverTrigger>
                    <PopoverContent className="w-44">
                        <ul className='flex flex-col gap-2 cursor-pointer'>
                            <li className='hover:bg-slate-200 p-2 rounded-md'>
                                Profile
                            </li>
                            <li className='hover:bg-slate-200 p-2 rounded-md'>
                                My Booking
                            </li>
                            <li className='hover:bg-slate-200 p-2 rounded-md'>
                                <LogoutLink>
                                    Logout
                                </LogoutLink>
                            </li>
                        </ul>
                    </PopoverContent>
                </Popover>
                :
                <LoginLink>
                    <Button>Get Started</Button>
                </LoginLink>
            }
            
            
            
        </div>
    );
}

export default Header