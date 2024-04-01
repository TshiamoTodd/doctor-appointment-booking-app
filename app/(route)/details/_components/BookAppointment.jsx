'use client';

import React, { useEffect, useState } from 'react';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';

  

function BookAppointment({doctor}) {
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState();
    const [selectedTimeSlot, setSelectedTimeSlot] = useState();
    const [note, setNote] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {user} = useKindeBrowserClient();

    useEffect(() => {
        getTime();
    }, []);

    const getTime = () => {
        const timeList = [];

        for (let i = 10; i <= 12; i++) {
            timeList.push(
                {time: i + ':00 AM'},
            );
            timeList.push(
                {time: i + ':30 AM'},
            );
        }
        for (let i = 1; i <= 6; i++) {
            timeList.push(
                {time: i + ':00 PM'},
            );
            timeList.push(
                {time: i + ':30 PM'},
            );
        }

        setTimeSlot(timeList);
    }

    const saveBooking = () => {
        setIsLoading(true);
        const data = {
            data: {
                UserName: user.given_name+" "+user.family_name,
                Email: user.email,
                Date: date,
                Time: selectedTimeSlot,
                doctor: doctor.id,
                Note: note
            }
        }

        GlobalApi.bookAppointment(data).then(res => {
            console.log(res);

            if(res) {
                setIsLoading(false);
                toast('Booking confirmation sent via email.');
            }
        });
    }

    const isPassedDay = (date) => {
        return date <= new Date();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-3 rounded-full">
                    Book appointment
                </Button>
            </DialogTrigger>
            <DialogContent>  
                <DialogHeader>
                    <DialogTitle>
                        Book Appointment
                    </DialogTitle>
                    <div className='mt-5'>
                        <div className='grid grid-cols-1 md:grid-cols-2 mb-3'>
                            {/* Calendar */}
                            <div className='flex flex-col gap-3 items-baseline'>
                                <h2 className='flex gap-2 items-center'>
                                    <CalendarDays className="h-5 w-5 text-primary"/>
                                    Select date
                                </h2>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    disabled={isPassedDay}
                                    className="rounded-md border"
                                />
                            </div>
                            {/* Time slot */}
                            <div className='mt-3 md:mt-0'>
                                <h2 className='flex gap-2 items-center mb-3'>
                                    <Clock className="h-5 w-5 text-primary"/>
                                    Select time slot
                                </h2>
                                <div className='grid grid-cols-3 gap-2 border rounded-lg p-5'>
                                    {timeSlot?.map((item, index) => (
                                        <h2 
                                            key={index}
                                            onClick={() => setSelectedTimeSlot(item.time)}
                                            className={`p-1 border text-center rounded-full hover:bg-primary hover:text-white cursor-pointer ${selectedTimeSlot === item.time &&'bg-primary text-white'}`}
                                        >
                                            {item.time}
                                        </h2>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Textarea 
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Type your notes here." 
                        />
                    </div>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <>
                            <Button className="text-red-500 border-red-500" type="button" variant="outline">
                                Close
                            </Button>
                            <Button type="button" disabled={!(date && selectedTimeSlot)} onClick={() => saveBooking()}>
                                {isLoading ? <Loader2 className='w-4 h-4 animate-spin'/> : 'Submit'}
                            </Button>
                        </>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}

export default BookAppointment