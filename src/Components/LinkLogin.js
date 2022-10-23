import React from 'react'
import { Link } from 'react-router-dom'

function LinkLogin({path, title}) {
  return (
    <>
        <Link to={path}>
        <h5 className=' text-gray-400 mt-6 md:pl-6 hover:text-purple-600'>{title}</h5>
        </Link>
    </>
  )
}

export default LinkLogin