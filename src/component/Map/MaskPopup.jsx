import React from 'react'
import { Popup } from 'react-leaflet'
import './MaskPopup.scss'
import ToGoogleMapButton from '../ToGoogleMapButton/ToGoogleMapButton.jsx'

const MaskPopup = ({ name, phone, mask_adult, mask_child, address, updated }) => {
    return (
        <Popup className="popup-container">
            <div className="mask-popup">
                <h1>{name}</h1>
                <h3>{phone}</h3>
                <h3>{address}</h3>
                <ToGoogleMapButton data={address} data2={name} />
                <div className="mask-box">
                    <h2 className={parseInt(mask_adult) === 0 ? 'no-mask' : ''}><span>成人口罩</span><span>{mask_adult}</span></h2>
                    <h2 className={parseInt(mask_child) === 0 ? 'no-mask' : ''}><span>兒童口罩</span><span>{mask_child}</span></h2>
                </div>
                <h3>資料更新:{updated}</h3>
            </div>
        </Popup>
    )
}

export default MaskPopup;
