import React, { useContext, useMemo } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet'
import MarkerClusterGroup from './MarkerClusterGroup.jsx'
import MaskPopup from './MaskPopup.jsx'

import { MaskContext } from '../Context.js'
import L from 'leaflet'

import './MarkerCluster.scss'

const markerClusterObject = {
    chunkedLoading: false,
    removeOutsideVisibleBounds: true,
    iconCreateFunction: function (cluster) {
        const count = cluster.getChildCount()
        let clusterSize = {
            name: "small",
            size: 30
        }
        if (count > 10) {
            clusterSize.name = "medium"
            clusterSize.size = 60
        }
        if (count > 50) {
            clusterSize.name = "large"
            clusterSize.size = 90
        }
        return new L.DivIcon({
            html: count,
            className: 'marker-cluster marker-cluster-' + clusterSize.name,
            iconSize: null
        })
    }
}
const MaskMap = () => {

    const { data, position, zoom} = useContext(MaskContext)
    const markerClusterGroup = useMemo(() => {
        return <MarkerClusterGroup setMarkerClusterObject={markerClusterObject}>
            {data.map(({ geometry, properties }) => {
                return <Marker position={[geometry.coordinates[1], geometry.coordinates[0]]} key={properties.id}>
                    <MaskPopup {...properties} />
                </Marker>
            })}
        </MarkerClusterGroup>
    }, [data])
    return (
        <Map center={[22.779538,
            120.352170]}
            zoom={12}
            maxZoom={40}
            duration={3}
            viewport={{
                center: position,
                zoom: zoom
            }}
        >
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></TileLayer>
            {
               markerClusterGroup
            }
        </Map>
    );
}

export default MaskMap;
