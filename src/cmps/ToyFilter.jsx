import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterRef = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilterRef.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    const { txt, maxPrice, inStockFilter, sortBy, sortOrder } = filterByToEdit
    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={txt}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={maxPrice || ''}
                    onChange={handleChange}
                />

                <select
                    name="inStockFilter"
                    value={inStockFilter}
                    onChange={handleChange}
                >
                    <option value='all'>All</option>
                    <option value="inStockFiltered">In Stock</option>
                    <option value="outOfStockFiltered">Out Of Stock</option>
                </select>

                <label htmlFor="sortBy">Sort by:</label>
                <select
                    id="sortBy"
                    name="sortBy"
                    value={sortBy}
                    onChange={handleChange}
                >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Created At</option>
                </select>
                

                <label htmlFor="sortOrder">Order:</label>
                <select
                    type='number'
                    id="sortOrder"
                    name="sortOrder"
                    value={sortOrder}
                    onChange={handleChange}
                >
                    <option value='1'>Ascending</option>
                    <option value='-1'>Descending</option>
                </select>



            </form>

        </section>
    )
}