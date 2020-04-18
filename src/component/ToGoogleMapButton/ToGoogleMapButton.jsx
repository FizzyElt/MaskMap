import React from 'react';
import './ToGoogleMapButton.scss'

class ToGoogleMapButton extends React.Component {

    openMaps(pharmacyAddress, pharmacyName) {
        const ADDRESS_LENGTH_FOR_ROAD = 9
        const addressToRoad = pharmacyAddress.substring(0, ADDRESS_LENGTH_FOR_ROAD)
        window.open(`https://www.google.com.tw/maps/search/${addressToRoad + pharmacyName}`)
    }

    render() {
        const {
            pharmacyAddress,
            pharmacyName
        } = this.props;

        return (
            <span
                onClick={() => { this.openMaps(pharmacyAddress, pharmacyName) }}
                className="to-google-map-button"
            >
                在 Google Maps 打開
            </span>
        )
    }
}

export default ToGoogleMapButton;