import React, { useCallback, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/httpHook';
import LinkCard from '../components/LinkCard';

export const DetailsPage = () => {
    const [link, setLink] = useState(null);
    const { id: linkId } = useParams()
    const {request, loading} = useHttp();
    const { token } = useContext(AuthContext);
    
    const getLink = useCallback( async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setLink(fetched);
        } catch (e) {}
    }, [token, linkId, request]);

    useEffect(() => {
        getLink();
    }, [getLink]);

    if (loading) {
        return <div>LOADING...</div>
    }

    return (
        <>
            {link && <LinkCard link={link} />}
        </>
    )
}