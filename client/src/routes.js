import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { CreatePage } from './pages/CreatePage';
import { DetailsPage } from './pages/DetailsPage';
import { LinksPage } from './pages/LinksPage';

export const useRoutes = isAuthenticated => {
    if(isAuthenticated) {
        return (
            <Routes>
                <Route path="/links" element={<LinksPage/>} exect/>
                <Route path="/create" element={<CreatePage/>}/>
                <Route path="/details/:id" element={<DetailsPage/>}/>
                <Route path="*" element={<CreatePage/>} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<AuthPage/>}/>
            <Route path="*" element={<AuthPage/>}/>
        </Routes>
    )
}