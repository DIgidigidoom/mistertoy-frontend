import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { toyService } from "../services/toy.service.js"


const socket = io('http://localhost:3030')

export function Chat({ toy, onSaveMsg }) {
    const [msgs, setMsgs] = useState([])
    const [txt, setTxt] = useState('')
    const [typing, setTyping] = useState('')
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const typingTimeout = useRef(null)




    useEffect(() => {
        
        _loadHistory()
        socket.on()
        socket.emit('chat-set-topic', toy._id)
        socket.on('chat-add-msg', (msg) => {
            setMsgs(prevMsgs => [...prevMsgs, msg])

        })
        socket.on('show-typing', (fullname) => {
            console.log('🔔 show-typing event received from:', fullname)
            if (fullname === user.fullname) return // don't show your own typing
            setTyping(`${fullname} is typing...`)

            clearTimeout(typingTimeout.current)
            typingTimeout.current = setTimeout(() => {
                setTyping('')
            }, 1500)

        })
        return () => {
            socket.off('chat-add-msg')
            socket.off('show-typing')
            clearTimeout(typingTimeout.current)
        }

    }, [toy._id])

    async function _loadHistory() {
        try {
            setMsgs(toy.msgs || [])
        } catch (err) {
            console.error('Failed to load chat history', err)
        }
    }

    function handleChange(ev) {
        setTxt(ev.target.value)
        socket.emit('user-typing', { toyId: toy._id, fullname: user.fullname })  
    }


    function onSend(ev) {
        ev.preventDefault()
        const msg = {
            by: {
                _id: user._id,
                fullname: user.fullname
            },
            txt,
            sentAt: Date.now()
        }

        onSaveMsg(msg)
        socket.emit('chat-send-msg', msg)
        setTxt('')
    }



    return (
        <section className="chat">
            <h4>Chat about : {toy.name}</h4>

            <div className="chat-messages">
                {msgs.map((msg, idx) => {
                    const isUserMsg = msg.by?._id?.toString() === user._id?.toString()
                    return (
                        <div key={idx} className={`chat-msg ${isUserMsg ? 'chat-user-msg' : 'other-msg'}`}>
                            <strong>{msg.by?.fullname || 'Me'}:</strong> {msg.txt}
                        </div>
                    )
                })}
                {typing && <div className="typing-indicator">{typing}</div>}
            </div>

            <form onSubmit={onSend} className="chat-form">
                <input
                    type="text"
                    name="name"
                    value={txt}
                    onChange={handleChange}
                    placeholder="Type your message..."
                />
                <button>Send</button>

            </form>
        </section>
    )
}
