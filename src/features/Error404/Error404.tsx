import React from 'react';
import s from './Error404.module.css'

function Error404() {
    return (
        <div className={s.wrapper}>
            <div className={s.error}>404</div>
            <div className={s.errorText}>Not found!</div>
            <div
                className={s.errorText2}>
                The resource requested could not be found on this server!
            </div>
        </div>
    )
}

export default Error404