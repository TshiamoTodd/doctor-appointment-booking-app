'use client';

import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function DoctorSuggestionList() {
    const [doctorList, setDoctorList] = useState([]);

    useEffect(() => {
        getSuggestedDoctors();
    }, []);

    const getSuggestedDoctors = () => {
        GlobalApi.getDoctorList().then(res => {
            setDoctorList(res.data.data);
        });
    }
    return (
        <div className='flex flex-col p-4 mt-5 border-[1px] rounded-lg'>
            <h2 className='font-bold'>Suggestions</h2>
            {doctorList && doctorList.map((doctor, index) => (
                <Link 
                    key={index}
                    href={`/details/${doctor.id}`} 
                    className='pb-3 border-b mb-2 flex mt-2 items-center rounded-lg hover:scale-105 transition-all ease-in-out cursor-pointer'
                >
                    <Image
                        src={doctor.attributes?.image?.data.attributes?.url}
                        alt='doctor'
                        width={70}
                        height={70}
                        className='w-[70-px] h-[70px] rounded-full'
                    />
                    <div className='ml-2 items-baseline flex flex-col gap-2'>
                        <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary'>
                            {doctor.attributes?.categories.data[0].attributes?.Name}
                        </h2>
                        <h2 className='font-bold text-[14px] px-1'>{doctor.attributes?.Name}</h2>
                        <h2 className='px-1 text-primary text-sm'>{doctor.attributes?.Year_of_Experience}</h2>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default DoctorSuggestionList