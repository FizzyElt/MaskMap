import React from 'react';
import './ToGoogleMapButton.scss'

function openMaps (pharmacyAddress, pharmacyName) {
    const ADDRESS_LENGTH_FOR_ROAD = 9
	const addressToRoad = pharmacyAddress.substring(0, ADDRESS_LENGTH_FOR_ROAD)
    window.open(`https://www.google.com.tw/maps/search/${addressToRoad+pharmacyName}`)
}
class ToGoogleMapButton extends React.Component {
    render() {
        return (
        	<span onClick={() => openMaps(this.props.data, this.props.data2)} className="connectToMap"> 在 Google Maps 打開</span>
        )
    }
}

export default ToGoogleMapButton;