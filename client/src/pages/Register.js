import React, {useEffect } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const navigate = useNavigate()
    // Form Submit
    const sumbitHandler = async (val) => {
        try {
            await axios.post('/users/register', val)
            message.success('Registration Successfully')
            navigate('/login')
        } catch (err) {
            message.error("Something Went Wrong")
        }
    }
    
    // prevent for login user
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate("/")
        }
    }, [navigate])

    return (
        <>
            <div className='register d-flex align-items-center justify-content-center'>
                <Form layout="vertical" onFinish={sumbitHandler}>
                    <h1>Register Form</h1>
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email-id" name="email">
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password" />
                    </Form.Item>
                    <div className='d-flex'>
                        <Link to="/login">Already Register ? Click Here to Login</Link>
                        <button className='btn btn-primary'>Register</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Register
