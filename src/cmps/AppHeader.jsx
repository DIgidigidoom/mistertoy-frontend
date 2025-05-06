import { Link, NavLink } from 'react-router-dom'
import { OnlineStatus } from './OnlineStatus.jsx'
import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { useSelector } from 'react-redux'
import { logout } from '../store/actions/user.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }
    return (
        <header className="app-header">
            <section>
                <Link to="/">
                    <h3>LOGO!</h3>
                </Link>
                <OnlineStatus />
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </nav>
            </section>
            {user ? (
                < section >
                    <span to={`/user/${user._id}`}>Hello {user.fullname} <span>$</span></span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
            <UserMsg />
        </header >
    )
}
