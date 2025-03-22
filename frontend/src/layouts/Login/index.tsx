import React from 'react';
import { Outlet } from 'react-router-dom';

function LoginLayout() {
    return (
        <div>
            <h1>Login Layout</h1>
            <Outlet />
        </div>
    );
}

export default LoginLayout;
