import styles from './SearchInput.module.css';
import { InputProps } from '../../../interfaces'

function SearchInput({value, onChange, width = '100px', placeholder = 'Type here...'}: InputProps) {
    return (
        <input placeholder={placeholder} className={styles.input} value={value} onChange={onChange} style={{width: width}}/>
    )
}

export default SearchInput;