'use client'

import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import Image from 'next/image';

function DoctorList({doctorList}) {

    return (
        <div className='mb-10 px-8'>
            <h2 className='font-bold text-xl'>Popular Doctors</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap2'>
                {doctorList.length > 0 ? doctorList.map((doctor, index) => (
                    <div key={index}
                        className='border-[1px] rounded-lg p-3 mb-3 mx-3 cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out'
                    >
                        <Image
                            src={doctor.attributes?.image?.data.attributes?.url}
                            alt='doctor'
                            width={500}
                            height={200}
                            className='h-[200px] w-full object-cover rounded-lg'
                        />
                        <div className='mt-3 items-baseline flex flex-col gap-1'>
                            <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary'>
                                {doctor.attributes?.categories.data[0].attributes?.Name}
                            </h2>
                            <h2 className='font-bold px-1'>{doctor.attributes?.Name}</h2>
                            <h2 className='px-1 text-primary text-sm'>{doctor.attributes?.Year_of_Experience}</h2>
                            <h2 className='px-1 text-sm text-gray-500'>{doctor.attributes?.Address}</h2>

                            <h2 className='p-2 px-3 border-[1px] border-primary text-primary rounded-full w-full text-center text-[11px] mt-2 cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out'>
                                Book Now
                            </h2>
                        </div>
                    </div>
                ))
            
            :
            
            // Skeleton effect
            [1,2,3,4,5,6].map((item, index) => (
                <div className='h-[220px] bg-slate-200 w-[95%] rounded-lg ml-3 mr-3 p-3 mb-3 animate-pulse'>
    
                </div>
            ))
        }
            </div>
        </div>
    );
}

export default DoctorList