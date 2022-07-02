import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/httpHook';
import LinksList from '../components/LinksList';

export const LinksPage = () => {
    const [links, setLinks ] = useState([]);
    const {loading, request } = useHttp();
    const { token } = useContext(AuthContext);

    const fetchLinks = useCallback( async () => {
        try {
            const fetchedLinks = await request(`/api/link`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setLinks(fetchedLinks)
        } catch (e) {}
    }, [token, request]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    return (
        <div>
            <h1>My links</h1>
            {links.length ? <LinksList links={links} /> : 'No added links yet'}
        </div>
    )
}