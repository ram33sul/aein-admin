import { ButtonProps } from '../../../interfaces';
import Loading from '../Loading/Loading';
import styles from './ButtonOne.module.css';

function ButtonOne({text = 'click', width, height, onClick, padding, type, loading = false}: ButtonProps) {

    let backgroundColor;
    let color;
    let border;
    let loadingColor: 'white' | 'black' = 'white';
    if(type === 'reject'){
        backgroundColor = 'white';
        color = 'black';
        border = '1px solid silver';
        loadingColor = 'black';
    }
    return (
        <div className={styles.button} style={{width, height, padding, backgroundColor, color, border}} onClick={!loading ? onClick : undefined} >
            {!loading ? text : <Loading color={loadingColor}/>}
        </div>
    )
}

export default ButtonOne;