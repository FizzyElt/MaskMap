import React, { useState, useContext, useEffect, createContext } from 'react';
import MaskMap from './component/MaskMap.jsx'
import { getData } from './fetchData.js'
import { MaskContext } from './Context.js'

const App = () => {
    const [maskData, setMaskData] = useState([])
    useEffect(() => {
        getData()
            .then(res => {
                setMaskData(res)
            })
            .catch(e => {

            })
    }, []);
    return (
        <MaskContext.Provider value={
            {
                data: maskData
            }
        }>
            <div className="container">
                <MaskMap />
            </div>
        </MaskContext.Provider>
    );
}

export default App;
