import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {

    return (
        <article>
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>Availability: <span>{toy.inStock ? 'In Stock' : 'Out of stock'} </span></p>
            <p>Labels: [{toy.labels.join(', ')}]</p>

           
            

        </article>
    )
}