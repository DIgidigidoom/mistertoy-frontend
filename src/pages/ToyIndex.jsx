import { useDispatch, useSelector } from 'react-redux'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useSearchParams } from "react-router-dom"

export function ToyIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
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

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    return (
        <div className='main-index container'>
            <h3>Mister Toy App</h3>
            <main>
                <button onClick={() => navigate(`/toy/edit`)}>Add Toy</button>
                <ToyFilter
                    filterBy={filterBy}
                    onSetFilter={onSetFilter} />
                {isLoading
                    ?
                    (<div>Loading...</div>)
                    : toys.length === 0 ?
                        (<div>No toys found</div>)
                        : (<ToyList
                            toys={toys}
                            onRemoveToy={onRemoveToy}
                        />)}
                <hr />
            </main>
        </div>
    )
}