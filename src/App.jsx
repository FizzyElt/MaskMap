import React, { useState, useContext, useEffect, createContext } from 'react';
import MaskMap from './component/MaskMap.jsx'
import PharmacySearch from './component/PharmacySearch.jsx'
import Loading from "./component/Loading.jsx"
import { getData } from './fetchData.js'
import { MaskContext } from './Context.js'

const defaultState = {
    lat: 22.779538,
    lng: 120.352170,
    zoom: 13
}

const App = () => {
    const [maskData, setMaskData] = useState([])
    const [position, setPosition] = useState({
        location: [defaultState.lat, defaultState.lng],
        zoom: defaultState.zoom
    })
    const [isLoading,setIsLoading]=useState(true)
    useEffect(() => {
        getData()
            .then(res => {
                setMaskData(res)
                setIsLoading(false)
            })
            .catch(e => {

            })
    }, []);
    return (
        <MaskContext.Provider value={
            {
                data: maskData,
                position: position.location,
                zoom:position.zoom,
                setPosition: (obj) => { setPosition(obj) }
            }
        }>
            <div className="container">
                <MaskMap />
                <PharmacySearch />
                {isLoading?<Loading/>:null}
            </div>
        </MaskContext.Provider>
    );
}

export default App;
