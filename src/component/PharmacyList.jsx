import React,{useContext} from 'react';
import './PharmacyList.scss'
import {MaskContext} from '../Context.js'

const PharamcyItem = ({ item }) => {
    const {setPosition} = useContext(MaskContext)
    const { properties, geometry } = item
    function goLocation(){
        setPosition({
            location:[geometry.coordinates[1],geometry.coordinates[0]],
            zoom:18
        })
    }
    return (<li>
        <h2 onClick={()=>goLocation()}>{properties.name}</h2>
        <h3>{properties.address}</h3>
        <h3>{properties.phone}</h3>
        <div>
            <h3 className={properties.mask_adult === 0 ? "no-mask" : ""}>
                <span>成人口罩</span>
                <span>{properties.mask_adult}</span>
            </h3>
            <h3 className={properties.mask_child === 0 ? "no-mask" : ""}>
                <span>兒童口罩</span>
                <span>{properties.mask_child}</span>
            </h3>
        </div>
    </li>)
}

const PharmacyList = ({ data, county, town }) => {
    const list = county && town ? data.filter(({ properties }) => {
        return properties.county === county && properties.town === town
    }) : []
    return (
        <ul className="pharmacy-list">
            {list.map(item => (<PharamcyItem item={item} key={item.properties.id} />))}
        </ul>
    );
}

export default PharmacyList;
