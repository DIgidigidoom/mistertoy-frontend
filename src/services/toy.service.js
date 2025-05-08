
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

// import Axios from 'axios'

// const axios = Axios.create({
//     withCredentials: true
// })

// const BASE_URL = '/api/toy/'
// const BASE_URL = 'http://127.0.0.1:3030/api/toy/'
const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    AddMsg
}



async function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

async function getById(toyId) {
    return httpService.get(BASE_URL + toyId)

}
async function remove(toyId) {
    return httpService.delete(BASE_URL + toyId) // api/toy/c102/remove
}

async function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}
async function AddMsg(msg, toyId) {
    return httpService.post(BASE_URL + toyId + '/msg', msg)
}


function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
        imgUrl: '',
    }
}


function getDefaultFilter() {
    return {
        txt: '',
        inStockFilter: 'all',
        sortByLabel: [],
        sortBy: 'name',
        sortOrder: 1,
    }
}



