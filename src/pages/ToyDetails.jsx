import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, useParams, useNavigate } from "react-router-dom"
import { PopUp } from "../cmps/PopUp.jsx"
import { Chat } from "../cmps/Chat.jsx"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [isChatOpen, setIsChatOpen] = useState(false)

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function toggleChat() {
        setIsChatOpen(prev => !prev)
    }
    
    async function onSaveMsg(msg) {
        try {
           const savedMsg =  await toyService.AddMsg(msg, toyId)
           console.log("savedMsg: ", savedMsg)
        } catch (error) {
            console.log('Had issues in toy msg', err)
        }
    }

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">
            <h1>{toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <p>Availability: <span>{toy.inStock ? 'In Stock' : 'Out of stock'}</span></p>
            <p>Labels: [{toy.labels.join(', ')}]</p>

            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>

            <p>
                <Link to="/toy/nJ5L4">Next Toy</Link>
            </p>

            <button onClick={toggleChat} style={{ marginTop: '1em' }}>
                💬 Chat
            </button>

            {isChatOpen && (
                <PopUp
                    heading="Chat with us!"
                    footing={<small>Type your question here</small>}
                    onClose={toggleChat}

                >
                    <Chat
                        toy={toy}
                        onSaveMsg={onSaveMsg}
                    />
                </PopUp>
            )}
        </section>
    )
}
