import React, { useEffect, useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import {message} from 'antd'

const Header = () => {

    const [loginUser, setLoginUser] = useState('')
const navigate=useNavigate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if ('user') {
            setLoginUser(user)
        }
    }, [])

    const logoutHandler=()=>{
        localStorage.removeItem('user')
        navigate('/login')
        message.success('Logout Successfully')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="/">Expense Tracker</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-link">
                                <p>{loginUser && loginUser.name}</p>
                            </li>
                            <li className="nav-link">
                               <button className="btn btn-primary" onClick={logoutHandler} > Logout</button>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
