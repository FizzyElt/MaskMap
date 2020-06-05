import React from 'react'
import './Loading.scss'
const Loading = () => {
  return (
    <div className='loading'>
      <div className='clock'>
        <span className='hour-bar'></span>
        <span className='min-bar'></span>
      </div>
    </div>
  )
}

export default Loading
