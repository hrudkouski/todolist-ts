import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Error404.module.css'

export const Error404 = () => (
    <div className={s.wrapper}>
        <h1>404</h1>
        <p>..........Oops! Something is wrong.</p>
        <NavLink className={s.button} to="/">
            &larr; Go back in initial page, is better
        </NavLink>
    </div>
);