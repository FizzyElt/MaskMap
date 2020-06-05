import React, { useState, useEffect } from 'react'

//component
import MaskMap from './component/Map/MaskMap.jsx'
import PharmacySearch from './component/PharmacySearch/PharmacySearch.jsx'
import Loading from './component/Loading/Loading.jsx'
import PositionBtn from './component/PositionBtn/PositionBtn.jsx'

import { getData } from './fetchData.js'
import { MaskContext } from './Context.js'

const defaultState = {
  lat: 22.779538,
  lng: 120.35217,
  zoom: 13,
}

const App = () => {
  const [maskData, setMaskData] = useState([])
  const [position, setPosition] = useState({
    location: [defaultState.lat, defaultState.lng],
    zoom: defaultState.zoom,
  })

  //使用者位置
  const [userPosition, setUserPosition] = useState({
    location: [-1, -1],
    zoom: 0,
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    //獲取資料
    getData()
      .then(res => {
        setMaskData(res)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    //獲取使用者位置
    if (!isLoading) {
      if (navigator.geolocation) {
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
  }, [isLoading])

  return (
    <MaskContext.Provider
      value={{
        data: maskData,
        position: position.location,
        userPosition: userPosition,
        zoom: position.zoom,
        setPosition,
      }}>
      <div className='container'>
        <MaskMap />
        <PharmacySearch />
        <PositionBtn loading={isLoading} setPosition={setPosition} setUserPosition={setUserPosition} />
        {isLoading ? <Loading /> : null}
      </div>
    </MaskContext.Provider>
  )
}

export default App
