
import { storageService } from './async-storage.service.js'
import { seedToys } from './toy.seed.service.js'
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}


seedToys()

// function query(filterBy = {}) {
//     return storageService.query(STORAGE_KEY)
//         .then(toys => {
//             if (!filterBy.txt) filterBy.txt = ''
//             if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
//             const regExp = new RegExp(filterBy.txt, 'i')
//             return toys.filter(toy =>
//                 regExp.test(toy.name) &&
//                 toy.price <= filterBy.maxPrice
//             )
//         })
// }
function query(filterBy = {}) {
    let { txt, maxPrice, inStockFilter, sortByLabel, sortBy, sortOrder } = filterBy
    console.log("filterBy: ", filterBy)
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!txt) txt = ''
            if (!maxPrice) maxPrice = Infinity
            if (txt) {
                const regExp = new RegExp(txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (maxPrice) {
                toys = toys.filter(toy => toy.price <= maxPrice)
            }

            if (inStockFilter === 'all') {

            } else if (inStockFilter === 'inStockFiltered') {
                toys = toys.filter(toy => toy.inStock)
            } else {
                toys = toys.filter(toy => !toy.inStock)
            }
            if (filterBy.sortByLabel?.length) {
                toys = toys.filter(toy =>
                    Array.isArray(toy.labels) &&
                    toy.labels.some(label => filterBy.sortByLabel.includes(label))
                )
            }

            if (sortBy === 'name') {
                toys.sort((a, b) => a.name.localeCompare(b.name) * sortOrder)
            } else if (sortBy === 'price') {
                toys.sort((a, b) => (a.price - b.price) * sortOrder)
            } else if (sortBy === 'createdAt') {
                toys.sort((a, b) => (a.createdAt - b.createdAt) * sortOrder)
            }

            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
    }
}



function getDefaultFilter() {
    return { txt: '', maxPrice: '', inStockFilter: 'all', sortByLabel: [], sortBy: 'name', sortOrder: 1 }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


