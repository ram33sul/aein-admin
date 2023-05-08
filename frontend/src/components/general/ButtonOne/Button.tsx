import { ButtonProps } from '../../../interfaces';
import styles from './ButtonOne.module.css';

function ButtonOne({text = 'click', width, height, onClick}: ButtonProps) {
    return (
        <div className={styles.button} style={{width, height}} onClick={onClick} >
            {text}
        </div>
    )
}

export default ButtonOne;