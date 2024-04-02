'use client'

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingList from './_components/BookingList';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

function MyBooking() {
    const [bookingList, setBookingList] = useState([]);

    const {user} = useKindeBrowserClient();

    useEffect(() => {
        user && getUserBookingList();
    }, [user]);

    const getUserBookingList = () => {
        GlobalApi.getUserBookingList(user?.email).then((res) => {
            console.log(res.data.data);
            setBookingList(res.data.data);
        });
    }

    const filterUserBooking = (type) => {
        const result = bookingList.filter(booking => 
            type == 'upcoming' 
            ? new Date(booking.attributes.Date) >= new Date() 
            : new Date(booking.attributes.Date) <= new Date()
        );

        console.log(result);
        return result;
    }

    return (
        <div className='px-4 sm:px-10 mt-10 h-screen'>
            <h2 className='font-bold text-2xl'>
                MyBooking
            </h2>
            <Tabs defaultValue='upcoming' className='w-full mt-5'>
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="expired">Expired</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                    <BookingList 
                        bookingList={filterUserBooking('upcoming')}
                        updateRecord={()=> getUserBookingList()}
                        expired={false}
                    />
                </TabsContent>
                <TabsContent value="expired">
                    <BookingList 
                        bookingList={filterUserBooking('expired')}
                        updateRecord={()=> getUserBookingList()}
                        expired={true}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default MyBooking