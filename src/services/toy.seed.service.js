// toy.seed.js

import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'toyDB'

export function seedToys() {
    const toysInStorage = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (toysInStorage && toysInStorage.length) return // Already seeded

    const demoToys = [
        {
            _id: 't101',
            name: 'Talking Doll',
            imgUrl: 'hardcoded-url-1',
            price: 123,
            labels: ['Doll', 'Baby'],
            createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10, // 10 days ago
            inStock: true
        },
        {
            _id: 't102',
            name: 'Puzzle Master',
            imgUrl: 'hardcoded-url-2',
            price: 85,
            labels: ['Puzzle', 'Box game'],
            createdAt: Date.now() - 1000 * 60 * 60 * 24 * 45, // 45 days ago
            inStock: true
        },
        {
            _id: 't103',
            name: 'Speed Racer',
            imgUrl: 'hardcoded-url-3',
            price: 200,
            labels: ['On wheels', 'Outdoor'],
            createdAt: Date.now() - 1000 * 60 * 60 * 24 * 90, // 90 days ago
            inStock: false
        },
        {
            _id: 't104',
            name: 'Magic Blocks',
            imgUrl: 'hardcoded-url-4',
            price: 150,
            labels: ['Art', 'Box game'],
            createdAt: Date.now() - 1000 * 60 * 60 * 24 * 120, // 120 days ago
            inStock: true
        },
        {
            _id: 't105',
            name: 'Outdoor Explorer',
            imgUrl: 'hardcoded-url-5',
            price: 60,
            labels: ['Outdoor'],
            createdAt: Date.now() - 1000 * 60 * 60 * 24 * 200, // 200 days ago
            inStock: true
        },
        {
            _id: 't106',
            name: 'Battery Bot',
            imgUrl: 'hardcoded-url-6',
            price: 180,
            labels: ['Battery Powered', 'On wheels'],
            createdAt: Date.now() - 1000 * 60 * 60 * 24 * 250, // 250 days ago
            inStock: true
        },
        {
            _id: 't107',
            name: 'Baby Cuddler',
            imgUrl: 'hardcoded-url-7',
            price: 95,
            labels: ['Baby', 'Doll'],
            createdAt: Date.now() - 1000 * 60 * 60 * 24 * 300, // 300 days ago
            inStock: false
        },
        {
            _id: 't108',
            name: 'Boxy Fun',
            imgUrl: 'hardcoded-url-8',
            price: 70,
            labels: ['Box game'],
            createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30, // 30 days ago
            inStock: true
        },
        {
            _id: 't109',
            name: 'Artistic Wonder',
            imgUrl: 'hardcoded-url-9',
            price: 110,
            labels: ['Art'],
            createdAt: Date.now() - 1000 * 60 * 60 * 24 * 150, // 150 days ago
            inStock: true
        },
        {
            _id: 't110',
            name: 'Rolling Thunder',
            imgUrl: 'hardcoded-url-10',
            price: 220,
            labels: ['On wheels', 'Outdoor'],
            createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
            inStock: true
        }
    ]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoToys))
}

// import { seedToys } from './services/toy.seed.js'

// seedToys()