import React, { useContext, useMemo } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'

//component
import MarkerClusterGroup from './MarkerClusterGroup.jsx'
import MaskPopup from './MaskPopup.jsx'

import { InStockIcon, StockOutIcon, PositionIcon } from '../../constant.js'
import { MaskContext } from '../../Context.js'
import L from 'leaflet'

import './MarkerCluster.scss'

//markerCluster設定檔
const markerClusterObject = {
  chunkedLoading: false,
  removeOutsideVisibleBounds: true,
  iconCreateFunction: function (cluster) {
    const count = cluster.getChildCount()
    let clusterSize = {
      name: 'small',
      size: 30,
    }
    if (count > 10) {
      clusterSize.name = 'medium'
      clusterSize.size = 60
    }
    if (count > 50) {
      clusterSize.name = 'large'
      clusterSize.size = 90
    }
    return new L.DivIcon({
      html: count,
      className: 'marker-cluster marker-cluster-' + clusterSize.name,
      iconSize: null,
    })
  },
}
const MaskMap = () => {
  const { data, position, zoom, userPosition } = useContext(MaskContext)

  //藥局 MarkerClusterGroup
  const markerClusterGroup = useMemo(() => {
    return (
      <MarkerClusterGroup setMarkerClusterObject={markerClusterObject}>
        {data.map(({ geometry, properties }) => {
          const isMaskStockOut = properties.mask_adult === 0

          const icon = isMaskStockOut ? StockOutIcon : InStockIcon
          const latitude = geometry.coordinates[1]
          const longitude = geometry.coordinates[0]

          return (
            <Marker position={[latitude, longitude]} key={properties.id} icon={icon}>
              <MaskPopup {...properties} />
            </Marker>
          )
        })}
      </MarkerClusterGroup>
    )
  }, [data])

  return (
    <Map
      center={[22.779538, 120.35217]}
      zoom={12}
      maxZoom={40}
      duration={3}
      viewport={{
        center: position,
        zoom: zoom,
      }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'></TileLayer>
      {markerClusterGroup}
      {userPosition.zoom !== 0 ? <Marker position={userPosition.location} icon={PositionIcon} /> : null}
    </Map>
  )
}

export default MaskMap
