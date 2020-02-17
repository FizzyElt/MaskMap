import axios from 'axios'

const api = "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json"

export const getData = () => {
    return new Promise((resolve, reject) => {
        axios.get(api).then(res => {
            resolve(res.data.features)
        }).catch(e => {
            reject(e)
        })
    })
}