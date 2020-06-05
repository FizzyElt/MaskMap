import React from 'react'
import PropTypes from 'prop-types'
import './PositionBtn.scss'

const PositionBtn = ({ loading, setPosition, setUserPosition }) => {
  const positionHandler = () => {
    if (!loading) {
      if (navigator.geolocation) {
        console.log(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(
          p => {
            const obj = {
              location: [p.coords.latitude, p.coords.longitude],
              zoom: 18,
            }
            setPosition(obj)
            setUserPosition(obj)
          },
          () => {
            setUserPosition({
              location: [-1, -1],
              zoom: 0,
            })
          }
        )
      }
    }
  }

  return (
    <button className='position-btn' onClick={positionHandler}>
      <span>定位</span>
    </button>
  )
}

PositionBtn.propTypes = {
  loading: PropTypes.bool,
  setPosition: PropTypes.func,
  setUserPosition: PropTypes.func,
}

export default PositionBtn
