import React from 'react'

const Filter = ({filter, applyFilter}) =>{

    return(
    <div> filter shown with <input value={filter} onChange={applyFilter} /> </div>
    )
}

export default Filter