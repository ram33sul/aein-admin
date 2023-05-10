import styles from './ErrorMessage.module.css';
import React from 'react'
interface props {
    size?: string, 
    text?: string
}
function ErrorMessage({size = '20px', text = 'Try again'}: props){
    const src = require(`../../../images/icons/error-red.png`);
    return (
        <div className={styles.container}>
            <img src={src} alt='error' style={{maxWidth: size, maxHeight: size}}/>
            <div className={styles.text} style={{fontSize: size}}>
                {text}
            </div>
        </div>
    )
}

export default ErrorMessage;