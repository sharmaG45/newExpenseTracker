import React, {useEffect} from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()

    const sumbitHandler = async (val) => {
        try {
            const { data } = await axios.post('/users/login', val)
            message.success("login Success")
            localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }))
            navigate('/')
        } catch (err) {
            message.error("Something Went Wrong")
        }
    }

    // prevent for login user
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate("/")
        }
    }, [navigate]);

    return (
        <>
            <div className='register d-flex align-items-center justify-content-center'>
                <Form layout="vertical" onFinish={sumbitHandler}>
                    <h1>Login Form</h1>
                    <Form.Item label="Email-id" name="email">
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password" />
                    </Form.Item>
                    <div className='d-flex'>
                        <Link to="/register">Not a user ? Click Here to Regsiter</Link>
                        <button className='btn btn-primary'>Login</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Login
