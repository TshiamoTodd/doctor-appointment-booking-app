import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapIcon } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import CancelAppointment from './CancelAppointment'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'

function BookingList({bookingList, expired, updateRecord}) {

    const onDeleteBooking = (id) => {
        console.log('Delete booking with id: ', id);
        GlobalApi.deleteBooking(id).then((res) => {
            console.log('Booking deleted successfully');
            if(res){
                toast('Booking deleted successfully!');
                updateRecord();
            }
        });
    }

    return (
        <div>
            {bookingList.map((booking, index) => (
                <div key={index} className='flex gap-4 items-center border p-3 m-3 rounded-lg'>
                    <Image
                        src={booking.attributes.doctor.data.attributes?.image?.data.attributes?.url}
                        alt='doctor-img'
                        width={100}
                        height={100}
                        className='rounded-full object-cover h-[70px] w-[70px]'
                    />
                    <div className='flex flex-col gap-2 w-full'>
                        <h2 className='font-bold text-[18px] flex justify-between items-center'>
                            {booking.attributes.doctor.data.attributes?.Name}
                            {!expired &&
                                <CancelAppointment 
                                    onCancelAppointment={() => onDeleteBooking(booking.id)}
                                /> 
                            }
                        </h2>
                        <h2 className='flex gap-2'>
                            <MapIcon className="h-5 w-5 text-primary"/>
                            {booking.attributes.doctor.data.attributes?.Address}
                        </h2>
                        <h2 className='flex gap-2'>
                            <Calendar className="h-5 w-5 text-primary"/>
                            Appointment on {moment(booking.attributes.Date).format('DD MMM YYYY')}
                        </h2>
                        <h2 className='flex gap-2'>
                            <Clock className="h-5 w-5 text-primary"/>
                            At: {booking.attributes.Time}
                        </h2>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BookingList