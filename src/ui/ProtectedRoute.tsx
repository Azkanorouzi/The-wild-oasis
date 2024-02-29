import React, { useEffect } from 'react'
import { useUser } from '../features/authentication/useUser'
import Spinner from './Spinner';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`

    export default function ProtectedRoute({children}) {
        const navigate = useNavigate();
        // 1. Load the authenticated user
        const {user, isLoading, isAuthenticated}  = useUser();

            // 2. if there's no authenticated user redirect to the login page
            useEffect(() => {
                if (!isAuthenticated && !isLoading) navigate('/login')
            }, [isAuthenticated, isLoading, navigate])

        // 3. While loading, show a spinner
        if (isLoading) return <FullPage><Spinner/></FullPage> ;


        // 4. if there's a user render the app
        if (isAuthenticated) return children;
        return <></>
    }
