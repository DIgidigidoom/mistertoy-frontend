import { ToyPreview } from "./ToyPreview.jsx"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {

    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    const navigate = useNavigate()

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />

                    <div>
                        <button onClick={() => onRemoveToy(toy._id)} disabled={!user?.isAdmin}>
                            X
                        </button>
                        <button onClick={() => navigate(`/toy/edit/${toy._id}`)} disabled={!user?.isAdmin}>
                            Edit
                        </button>
                        <button onClick={() => navigate(`/toy/${toy._id}`)}>Details</button>

                    </div>
                    {/* <button className="buy" onClick={() => addToCart(toy)}>
                        Add to Cart
                    </button> */}
                </li>)}
        </ul>
    )
}