import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

function CategorySearch() {
  return (
    <div className='mb-10 items-center flex flex-col gap-2'>
        <h2 className='font-bold text-4xl tracking-wide'>
            Search <span className='text-primary'>Doctors</span>
        </h2>
        <h2 className='text-gray-500 text-xl'>
            Search your doctor and book an appointment in one click.
        </h2>

        <div className="flex w-full max-w-sm items-center space-x-2 mt-3">
            <Input type="text" placeholder="Search..." />
            <Button type="submit">
                <Search className='h-4 w-4 mr-2'/>
                Search
            </Button>
        </div>
    </div>
  )
}

export default CategorySearch