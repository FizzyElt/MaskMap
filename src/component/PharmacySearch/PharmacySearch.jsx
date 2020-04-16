import React, { useContext, useState} from 'react';
import './PharmacySearch.scss'
import SearchBox from './SearchBox.jsx'
import PharmacyList from '../PharmacyList/PharmacyList.jsx'
import Today from '../Today/Today.jsx'
import { MaskContext } from '../../Context.js'

//將Select需要的搜索項目先提出來
function optionsfilter(arr) {

    const result = arr.map(({ properties }) => {
        return {
            county: properties.county,
            town: properties.town
        }
    })
    return result
}

//藥局搜索操作頁面
const PharmacySearch = () => {
    const { data } = useContext(MaskContext)
    const [control, setControl] = useState(true)
    const [county, setCounty] = useState("")
    const [town, setTown] = useState("");

    return (
        <div className={"pharmacy-container " + (control ? "" : "close")}>
            <Today />
            <SearchBox options={optionsfilter(data)}
                county={county}
                setCounty={setCounty}
                setTown={setTown} />
            <PharmacyList data={data} county={county} town={town} />
            <button onClick={() => setControl(!control)}>&#10093;</button>
        </div>
    );
}

export default PharmacySearch;
