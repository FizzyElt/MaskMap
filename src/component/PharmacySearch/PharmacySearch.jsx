import React, { useContext, useState, useReducer } from 'react'
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
      town: properties.town,
      cunli: properties.cunli,
    }
  })
  return result
}
const initAddress = {
  county: '',
  town: '',
  cunli: '',
}
function reducer(state, action) {
  switch (action.type) {
    case 'updateCounty':
      return { town: '', cunli: '', county: action.payload }
    case 'updateTown':
      return { ...state, cunli: '', town: action.payload }
    case 'updateCunli':
      return { ...state, cunli: action.payload }
    default:
      return state
  }
}

//藥局搜索操作頁面
const PharmacySearch = () => {
  const { data } = useContext(MaskContext)
  const [control, setControl] = useState(true)
  const [{ county, town, cunli }, dispatch] = useReducer(reducer, initAddress)

  return (
    <div className={'pharmacy-container ' + (control ? '' : 'close')}>
      <div>
        <Today />
        <SearchBox
          options={optionsfilter(data)}
          county={county}
          town={town}
          cunli={cunli}
          setAddress={dispatch}
        />
      </div>
      <PharmacyList data={data} county={county} town={town} cunli={cunli} />
      <button onClick={() => setControl(!control)}>&#10093;</button>
    </div>
  )
}

export default PharmacySearch
