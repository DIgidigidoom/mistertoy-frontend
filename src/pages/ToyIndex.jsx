import { useDispatch, useSelector } from 'react-redux'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

export function ToyIndex() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toyss!')
            })
    }, [filterBy])

    // function onSetFilter(filterBy) {
    //     setFilterBy(filterBy)
    // }

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    // function onEditToy(toy) {
    //         const price = +prompt('New price?')
    //         const toyToSave = { ...toy, price }

    //         saveToy(toyToSave)
    //             .then((savedToy) => {
    //                 showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
    //             })
    //             .catch(err => {
    //                 showErrorMsg('Cannot update toy')
    //             })
    //     }



    return (
        <div className='main-index container'>
            <h3>Mister Toy App</h3>
            <main>
                <button onClick={() => navigate(`/toy/edit`)}>Add Toy</button>
                {/* <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                    // onEditToy = {onEditToy}
                    />
                    : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )

}