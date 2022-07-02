import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/httpHook';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export const CreatePage = () => {
    const [ link, setLink ] = useState('');
    const { request } = useHttp();
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('api/link/generate', 'POST', { from: link}, {
                    Authorization: `Bearer ${token}`
                });

                navigate(`/details/${data.link._id}`)
            } catch (e) {}
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2em'}}>
            <div className="input-field">
            <input
                placeholder="Enter your link"
                id="link"
                type="text"
                onChange={e => setLink(e.target.value)}
                onKeyPress={pressHandler}
            />
            <label htmlFor="password">Your link</label>
            </div>
            </div>
        </div>
    )
}