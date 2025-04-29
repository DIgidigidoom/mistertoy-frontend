import { Link, NavLink } from 'react-router-dom'

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h3>LOGO!</h3>
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/toy">Toys</NavLink>
            
        </nav>
    </header>
}
