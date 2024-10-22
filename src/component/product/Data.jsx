import React from 'react'

const Data = (prop) => {
  return (
    <div>
       <div className="border p-3 rounded">
        <img src={prop.image} className='img-fluid w-100 mb-2' alt="" />
        <h4>{prop.name}</h4>
        <h5>{prop.category}</h5>
        <h5 className='text-success mb=0'>{prop.price}</h5>
       </div>
    </div>
  ) 
}

export default Data