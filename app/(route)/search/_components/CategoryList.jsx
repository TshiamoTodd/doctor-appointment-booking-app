'use client';

import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function CategoryList() {
    const [categoryList, setCategoryList] = useState([]);

    const path = usePathname();
    const category = path.split('/')[2];

    useEffect(() => {
        getCategoryList()
    }, []);

    const getCategoryList = () => {
        GlobalApi.getCategory().then(res => {
            console.log(res.data.data);
            setCategoryList(res.data.data);
        });
    };

    return (
        <div className='h-screen sticky mt-5 flex flex-col'>
            <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList className="overflow-visible">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {categoryList && categoryList.map((categoryItem, index) => (
                            <CommandItem key={index}>
                                <Link
                                    href={'/search/' + categoryItem?.attributes?.Name}
                                    className={`p-2 flex gap-2 items-center text-[14px] text-blue-600 rounded-md cursor-pointer w-full ${category===categoryItem.attributes.Name && 'bg-blue-100'}`}
                                >
                                    <Image 
                                        src={categoryItem.attributes.Icon.data.attributes.url} 
                                        alt={'icon'} 
                                        width={25} 
                                        height={25}
                                    />
                                    <label>{categoryItem.attributes.Name}</label>
                                </Link>
                            </CommandItem>
                        ))}
                        
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    );
}

export default CategoryList