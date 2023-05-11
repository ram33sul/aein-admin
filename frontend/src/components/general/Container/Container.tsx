import { ReactNode } from 'react';
import styles from './Container.module.css';

interface props {
    children?: ReactNode;
    flexDirection?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
    gap?: string;
    padding?: string;
    border?: string;
    width?: string;
    height?: string;
    margin?: string;
}
function Container(props: props){

    const {children, ...styling} = props

    return (
        <div className={styles.container} style={{...styling}}>
            {children ? children : ''}
        </div>
    )
}

export default Container;