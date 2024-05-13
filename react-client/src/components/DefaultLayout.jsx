import React from 'react'
import { Link } from 'react-router-dom'

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </nav>
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}

export default DefaultLayout