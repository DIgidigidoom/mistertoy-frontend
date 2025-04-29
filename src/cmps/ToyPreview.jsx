export function ToyPreview({ toy }) {

    return (
        <article>
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>Availability: <span>{toy.inStock ? 'In Stock' : 'Out of stock'} </span></p>
            <p>Labels: [{toy.labels.join(', ')}]</p>

            {/* <Link to={`/car/edit/${car._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/car/${car._id}`}>Details</Link> */}

        </article>
    )
}