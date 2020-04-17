import React from 'react'
import { Popup } from 'react-leaflet'
import './MaskPopup.scss'


const MaskPopup = ({ name, phone, mask_adult, mask_child, address, note, updated }) => {
    function openMaps(researchAddress) {
        window.open(`http://maps.apple.com/maps?q=${researchAddress}`);
    }
    return (
        <Popup className="popup-container">
            <div className="mask-popup">
                <h1>{name}</h1>
                <h3>{phone}</h3>
                <h3>{address}</h3>
                <div onClick={() => openMaps(address)} className="connectToMap">在 Google Maps 打開</div>
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

export default MaskPopup;
