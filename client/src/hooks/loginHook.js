import { useCallback, useEffect, useState } from "react"

export const useLogin = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);
        
        localStorage.setItem('userJWTtoken', JSON.stringify({ token: jwtToken, userId: id}));
    }, []);

    const logout = useCallback( () => {
        setToken(null);
        setUserId(null);

        localStorage.removeItem('userJWTtoken');
    }, []);

    // if we refresh the page this feature allows us to stay in current page (it check if we logged)
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userJWTtoken'));

        if (data && data.token) {
            login(data.token, data.id)
        }
    }, [login]);


    return { login, logout, token, userId };
};