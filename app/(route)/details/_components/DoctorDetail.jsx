import { Button } from '@/components/ui/button'
import { GraduationCap, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import BookAppointment from './BookAppointment';

function DoctorDetail({doctor}) {
    const socialMediaList = [
        {id: 1, icons: '/youtube.png', url: 'https://www.youtube.com/'},
        {id: 2, icons: '/facebook.png', url: 'https://www.facebook.com/'},
        {id: 3, icons: '/twitter.png', url: 'https://www.twitter.com/'},
        {id: 4, icons: '/linkedin.png', url: 'https://www.linkedin.com/'},
    ];

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg'>
                {/* Doctor image */}
                <div>
                    <Image 
                        src={doctor.attributes?.image?.data.attributes?.url} 
                        alt={'image'} 
                        width={300} 
                        height={300} 
                        className='rounded-lg w-full h-[270px] object-cover'
                    />
                </div>
                {/* Doctor information */}
                <div className='col-span-2 md:px-10 flex mt-5 flex-col gap-2 items-baseline'>
                    <h2 className='font-bold text-2xl mt-5'>
                        {doctor.attributes?.Name}
                    </h2>
                    <h2 className='flex gap-2 text-gray-500 text-md'>
                        <GraduationCap/>
                        <span>{doctor.attributes?.Year_of_Experience}</span>
                    </h2>
                    <h2 className='flex gap-2 text-gray-500 text-md'>
                        <MapPin/>
                        <span>{doctor.attributes?.Address}</span>
                    </h2>
                    <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary'>
                        {doctor.attributes?.categories.data[0].attributes?.Name}
                    </h2>

                    <div className='flex gap-3 mt-3'>
                        {socialMediaList.map((item, index) => (
                            <Image
                                key={index}
                                src={item.icons}
                                alt={item.url}
                                width={30}
                                height={30}
                                className='cursor-pointer' 
                                onClick={() => window.open(item.url)}
                            />
                        ))}
                    </div>
                    <BookAppointment/>
                </div>
            </div>
            {/* About doctor */}
            <div className='mt-5 p-3 border-[1px] rounded-lg'>
                <h2 className='font-bold text-[20px]'>
                    About me
                </h2>
                <p className='text-gray-500 tracking-wider mt-2'>
                    {doctor.attributes?.About[0].children[0].text}
                </p>
            </div>
        </>
    );
}

export default DoctorDetail