import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {useHttp} from '../hooks/httpHook';
import {useMessage} from '../hooks/messageHook';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const [form, setForm] = useState({ email: '', password: ''});
    const {loading, request, error, clearError} = useHttp();
    const { message } = useMessage();

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    useEffect(() => {
        message(error)
        clearError();
    }, [error, message, clearError])

    const formHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <div className="col s1 offset-s3"></div>
            <h1>Auth Page</h1>
            <div className="card green darken-3">
                <div className="card-content white-text">
                    <span className="card-title">Authenication</span>
                    <div className="input-field">
                        <input
                            placeholder="Email" 
                            id="email"
                            name="email"
                            type="text"
                            value={form.email}
                            onChange={formHandler}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Password"
                            id="password"
                            name="password"
                            type="text"
                            value={form.password}
                            onChange={formHandler}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="card-action">
                    <button className="btn black lighten-3 white-text" onClick={loginHandler} style={{marginRight: 20}}>Login</button>
                    <button className="btn black lighten-3 white-text" onClick={registerHandler} disabled={loading}>Register</button>
                </div>
            </div>
        </div>
    )
}