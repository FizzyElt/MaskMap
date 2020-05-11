import React from 'react'
import PropTypes from 'prop-types'
import { Popup } from 'react-leaflet'
import './MaskPopup.scss'
import ToGoogleMapButton from '../ToGoogleMapButton/ToGoogleMapButton.jsx'

const MaskPopup = ({ name, phone, mask_adult, mask_child, address, note, updated }) => {
    return (
        <Popup className="popup-container">
            <div className="mask-popup">
                <h1>{name}</h1>
                <h3>{phone}</h3>
                <h3>{address}</h3>
                <ToGoogleMapButton
                    pharmacyAddress={address}
                    pharmacyName={name}
                />
                <div className="mask-box">
                    <h2 className={parseInt(mask_adult) === 0 ? 'no-mask' : ''}><span>成人口罩</span><span>{mask_adult}</span></h2>
                    <h2 className={parseInt(mask_child) === 0 ? 'no-mask' : ''}><span>兒童口罩</span><span>{mask_child}</span></h2>
                </div>
                <h3>{note}</h3>
                <h3>資料更新:{updated}</h3>
            </div>
        </Popup>
    )
}

MaskPopup.propTypes={
    name:PropTypes.string,
    phone:PropTypes.string,
    mask_adult:PropTypes.number,
    mask_child:PropTypes.number,
    address:PropTypes.string,
    note:PropTypes.string,
    updated:PropTypes.string,

}


export default MaskPopup;
