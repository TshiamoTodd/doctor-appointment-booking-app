'use client'

import DoctorList from '@/app/_components/DoctorList';
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react'

function Search({params}) {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    console.log('Search: ', params.categoryname);
    getDoctors();
  }, []);

  const categoryname = params.categoryname
  const getDoctors = () => {
    GlobalApi.getDoctorListByCategory(categoryname).then(res => {
      console.log('Doctors: ', res.data);
      setDoctorList(res.data.data);
    });
  };

  return (
    <div className='mt-5'>
      <DoctorList doctorList={doctorList} heading={categoryname} />
    </div>
  )
}

export default Search