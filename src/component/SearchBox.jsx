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
function getTownOptions(arr, location) { //獲取地區列表(不重複)
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

const SearchBox = ({ options, setCounty, setTown, county }) => {
    const countyOptions = getCountyOptions(options)
    const townOptions = county ? getTownOptions(options, county) : []

    function locationChangeHandler(selectedOptions) {
        setCounty(selectedOptions.value)
        setTown("")
    }
    function townChangeHandler(selectedOptions) {
        setTown(selectedOptions.value)
    }

    return (
        <div className="select-box">
            <div>
                <span>縣市</span>
                <Select className="select" options={countyOptions} onChange={locationChangeHandler} />
            </div>
            <div>
                <span>地區</span>
                <Select className="select" options={townOptions} onChange={townChangeHandler} />
            </div>
        </div>
    );
}

export default SearchBox;
