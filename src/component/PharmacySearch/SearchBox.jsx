import React from 'react';
import Select from 'react-select'
import './SearchBox.scss'

function getCountyOptions(arr) {    //獲取縣市列表(不重複)
    const set = new Set()

    return arr.filter(({ county }) => !set.has(county) ? set.add(county) : false).reduce((result, { county }) => {
        if (county) {
            result.push({
                value: county,
                label: county
            })
        }
        return result
    }, [])
}
function getTownOptions(arr, location) { //獲取地區列表
    const set = new Set()
    return arr.filter(({ county }) => {
        return county === location
    }).filter(({ town }) => !set.has(town) ? set.add(town) : false)
        .map(({ town }) => {
            return {
                value: town,
                label: town
            }
        })
}
function getCunliOptions(arr, location) { //獲取里列表
    const set = new Set()
    console.log('cunli')
    return arr.filter(({ town }) => {
        return town === location
    }).filter(({ cunli }) => !set.has(cunli) ? set.add(cunli) : false)
        .map(({ cunli }) => {
            return {
                value: cunli,
                label: cunli
            }
        })
}


//搜尋
const SearchBox = ({ options, setCounty, setTown, setCunli, county, town, cunli }) => {
    const countyOptions = getCountyOptions(options)
    const townOptions = county ? getTownOptions(options, county) : []
    const cunliOptions = town ? getCunliOptions(options, town) : []

    function locationChangeHandler(selectedOptions) {
        setCounty(selectedOptions.value)
        setTown("")
        setCunli("")
    }
    function townChangeHandler(selectedOptions) {
        setTown(selectedOptions.value)
        setCunli("")
    }
    function cunliChangeHandler(selectedOptions) {
        setCunli(selectedOptions.value)
    }

    return (
        <div className="select-box">
            <div>
                <span>縣市</span>
                <Select className={"select " + (!county? "select-active" : "")} options={countyOptions} onChange={locationChangeHandler} />
            </div>
            <div>
                <span>地區</span>
                <Select className={"select " + (county && !town ? "select-active" : "")} options={townOptions} onChange={townChangeHandler} />
            </div>
            <div>
                <span>里</span>
                <Select className={"select " + (town && !cunli ? "select-active" : "")} options={cunliOptions} onChange={cunliChangeHandler} />
            </div>
        </div>
    );
}

export default SearchBox;
