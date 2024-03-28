'use client'

import React, { useEffect } from 'react'

function Search({params}) {
  useEffect(() => {
    console.log('Search: ', params.categoryname)
  }, [])
  return (
    <div>Search</div>
  )
}

export default Search