import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

import ToGoogleMapButton from '../ToGoogleMapButton/ToGoogleMapButton.jsx'

import './PharmacyList.scss'

import { MaskContext } from '../../Context.js'

const PharamcyItem = ({ item }) => {
  const { position, setPosition } = useContext(MaskContext)
  const { properties, geometry } = item
  function goLocation() {
    if (position[0] !== geometry.coordinates[1] && position[1] !== geometry.coordinates[0]) {
      setPosition({
        location: [geometry.coordinates[1], geometry.coordinates[0]],
        zoom: 18,
      })
    } else {
      return
    }
  }
  return (
    <li>
      <h2 onClick={() => goLocation()}>{properties.name}</h2>
      <h3>{properties.address}</h3>
      <ToGoogleMapButton pharmacyAddress={properties.address} pharmacyName={properties.name} />
      <h3>{properties.phone}</h3>
      <div>
        <h3 className={properties.mask_adult === 0 ? 'no-mask' : ''}>
          <span>成人口罩</span>
          <span>{properties.mask_adult}</span>
        </h3>
        <h3 className={properties.mask_child === 0 ? 'no-mask' : ''}>
          <span>兒童口罩</span>
          <span>{properties.mask_child}</span>
        </h3>
      </div>
    </li>
  )
}
PharamcyItem.propTypes = {
  item: PropTypes.object,
}

const PharmacyList = ({ data, county, town, cunli }) => {
  const list = useMemo(
    () =>
      county && town && cunli
        ? data.filter(({ properties }) => {
            return properties.county === county && properties.town === town && properties.cunli === cunli
          })
        : [],
    [cunli, data, town, county]
  )
  return (
    <ul className='pharmacy-list'>
      {list.map(item => (
        <PharamcyItem item={item} key={item.properties.id} />
      ))}
    </ul>
  )
}
PharmacyList.propTypes = {
  data: PropTypes.array,
  county: PropTypes.string,
  town: PropTypes.string,
  cunli: PropTypes.string,
}

export default PharmacyList
