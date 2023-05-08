import { InputProps } from '../../../interfaces';
import styles from './Input.module.css';

function Input({width = '100px', height = '40px', value, onChange, label = 'label', placeholder = 'type here', type = 'text', error = ''}: InputProps){
    return (
        <div className={styles.container} style={{width: width, height}}>
            <input style={{borderColor: error ? 'red' : ''}} value={value} onChange={onChange} type={type} className={styles.input} placeholder={placeholder} required/>
            <div className={styles.label} style={{color: error ? 'red' : 'black'}}>
                {error ? error : label}
            </div>
        </div>
    )
}

export default Input;