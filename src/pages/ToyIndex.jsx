import { useDispatch, useSelector } from 'react-redux'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function ToyIndex() {

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

        // function onAddToy() {
        //         const toyToSave = toyService.getRandomToy()
        //         saveCar(carToSave)
        //             .then((savedCar) => {
        //                 showSuccessMsg(`Car added (id: ${savedCar._id})`)
        //             })
        //             .catch(err => {
        //                 showErrorMsg('Cannot add car')
        //             })
        //     }


    return (
        <div>
            <h3>Mister Toy App</h3>
            <main>
                {/* <Link to="/toy/edit">Add Toy</Link>
                        <button className='add-btn' onClick={onAddToy}>Add A Toy</button>
                        <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        // onEditToy={onEditToy}
                        // addToToyt={addToToyt}
                    />
                    : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )

}