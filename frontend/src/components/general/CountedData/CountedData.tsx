import styles from './CountedData.module.css';
import { stringOrNumber} from '../../../types'
import ViewText from '../ViewText/ViewText';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

type props = {
    heading: string;
    count: number;
    subHeading: string;
    subCount: stringOrNumber;
    theme?: 'light' | 'dark';
    width?: string;
    loading: boolean;
    error?: boolean;
    height?: string;
    onClick?: () => void;
}
function CountedData({heading, count, subHeading, subCount, theme = 'light', width, loading , error = false, height = '', onClick}: props){
    return ( 
        <div onClick={onClick} className={styles.container} style={theme === 'light' ? {color: 'black', backgroundColor: 'var(--silver-color-light)', width, height} : {color: 'white', backgroundColor: 'var(--blue-color-dark)', width, height}}>
            {
                loading ?
                <div className={styles.loading}>

                </div> : 
                <>
                    <div className={styles.heading}>
                        {heading}
                    </div>
                    <div className={styles.count} style={error ? {color: 'red'} : {}}>
                        {!error ? count : <ErrorMessage/>}
                    </div>
                    <div className={styles["sub-heading"]}>
                        {subHeading} - <strong style={error ? {color: 'red'} : {}}>{!error ? subCount : <ErrorMessage size='15px' />}</strong>
                    </div>
                    <div className={styles.view}>
                        <ViewText />
                    </div> 
                </>
            }
        </div>
    )
}

export default CountedData;