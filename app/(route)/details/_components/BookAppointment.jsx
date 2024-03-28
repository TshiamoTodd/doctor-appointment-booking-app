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
import { CalendarDays, Clock } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

  

function BookAppointment() {
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState();
    const [selectedTimeSlot, setSelectedTimeSlot] = useState();

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

    const isPassedDay = (date) => {
        return date <= new Date();
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button className="mt-3 rounded-full">
                    Book appointment
                </Button>
            </DialogTrigger>
            <DialogContent>  
                <DialogHeader>
                <DialogTitle>Book Appointment</DialogTitle>
                <DialogDescription>
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
                                            onClick={() => setSelectedTimeSlot(item.time)}
                                            className={`p-2 border text-center rounded-full hover:bg-primary hover:text-white cursor-pointer ${selectedTimeSlot === item.time &&'bg-primary text-white'}`}
                                        >
                                            {item.time}
                                        </h2>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Textarea placeholder="Type your notes here." />
                    </div>
                </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <>
                            <Button className="text-red-500 border-red-500" type="button" variant="outline">
                                Close
                            </Button>
                            <Button type="button" disabled={!(date && selectedTimeSlot)}>
                                Submit
                            </Button>
                        </>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}

export default BookAppointment