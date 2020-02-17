import React, { useState, useContext } from 'react';
import { Map, TileLayer, Marker} from 'react-leaflet'
import MarkerClusterGroup from './MarkerClusterGroup.jsx'
import MaskPopup from './MaskPopup.jsx'

import {MaskContext} from '../Context.js'
import L from 'leaflet'

import './MarkerCluster.scss'

const defaultState = {
    lat: 22.779538,
    lng: 120.352170,
    zoom: 13
}
const markerClusterObject = {
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
    const [position, setPosition] = useState([defaultState.lat, defaultState.lng]);
    const {data} = useContext(MaskContext)

    return (
        <Map center={position} zoom={defaultState.zoom} maxZoom={30}>
            <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></TileLayer>
            <MarkerClusterGroup setMarkerClusterObject={markerClusterObject}>
                {data?data.map(({geometry,properties})=>{
                    return <Marker position={[geometry.coordinates[1],geometry.coordinates[0]]} key={properties.id}>
                        <MaskPopup {...properties}/>
                    </Marker>
                }):null}
            </MarkerClusterGroup>
        </Map>
    );
}

export default MaskMap;
