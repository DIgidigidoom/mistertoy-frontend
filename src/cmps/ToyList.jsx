import { ToyPreview } from "./ToyPreview.jsx"
import { useNavigate } from "react-router-dom"

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {

    const navigate = useNavigate()

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />

                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        <button onClick={() => navigate(`/toy/edit/${toy._id}`)}>Edit</button>
                        <button onClick={() => navigate(`/toy/${toy._id}`)}>Details</button>

                    </div>
                    {/* <button className="buy" onClick={() => addToCart(toy)}>
                        Add to Cart
                    </button> */}
                </li>)}
        </ul>
    )
}