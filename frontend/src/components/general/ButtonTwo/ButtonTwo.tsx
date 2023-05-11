import { ButtonProps } from '../../../interfaces';
import styles from './ButtonTwo.module.css';

function ButtonTwo({text, onClick, height = '100%', width = '100%', padding}: ButtonProps){
    return (
        <div className={styles.button} style={{height, width}} onClick={onClick}>
            {text}
        </div>
    )
}

export default ButtonTwo;