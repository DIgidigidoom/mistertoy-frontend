import { useEffect, useRef, useState } from "react"

export function Chat({ toy }) {
    const [msgs, setMsgs] = useState([])
    const [txt, setTxt] = useState('')
    const timeoutIdRef = useRef(null)


    useEffect(() => {
        return () => clearTimeout(timeoutIdRef.current)
    }, [])

    function handleChange(ev) {
        setTxt(ev.target.value)
    }


    function onSend(ev) {
        ev.preventDefault()
        if (!txt.trim()) return

        const newMsg = { from: 'User', txt }
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
        setTxt('')


        timeoutIdRef.current = setTimeout(() => {
            setMsgs(prevMsgs => [...prevMsgs, { from: 'Support', txt: "I'm on it." }])
        }, 1000)
    }

    return (
        <section className="chat">
            <h4>Chat about : {toy.name}</h4>

            <div className="chat-messages">
                {msgs.map((msg, idx) => (
                    <div key={idx} className={`msg ${msg.from === 'User' ? 'user-msg' : 'support-msg'}`}>
                        <strong>{msg.from}:</strong> {msg.txt}
                    </div>
                ))}
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
