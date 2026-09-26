import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(url)
    const response = request.then(res => res.data)
    return response
}

const add = (toAdd) => {
    const request = axios.post(url, toAdd)
    const response = request.then(res => res.data)
    return response
}

const remove = (id) => {
    const request = axios.delete(`${url}/${id}`)
    const response = request.then(res => res.data)
    return response
} 

const update = (id, updatedObj) => {
    const request = axios.put(`${url}/${id}` , updatedObj)
    const response = request.then(res => res.data)
    return response
}


export default { getAll , add , remove , update }