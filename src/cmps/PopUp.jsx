
import { useEffect, useRef, useState } from "react"

export function PopUp({ heading, footing, children, onClose }) {

    useEffect(() => {
        function onEscKey(ev) {
            if (ev.key === 'Escape') onClose()
        }
        document.body.addEventListener('keydown', onEscKey)
        return () => document.body.removeEventListener('keydown', onEscKey)
    }, [onClose])

    return (
        <section className="nice-popup">
            <div className="popup-content">
                <header className="popup-header">
                    <h2>{heading}</h2>
                    <button onClick={onClose}>X</button>
                </header>

                <main className="popup-main">
                    {children}
                </main>

                <footer className="popup-footer">
                    {footing}
                </footer>
            </div>
        </section>
    )
}