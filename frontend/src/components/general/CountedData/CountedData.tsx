import styles from './CountedData.module.css';
import { stringOrNumber} from '../../../types'
import ViewText from '../ViewText/ViewText';

type props = {
    heading: string;
    count: number;
    subHeading: string;
    subCount: stringOrNumber;
    theme?: 'light' | 'dark';
    width?: string;
}
function CountedData({heading, count, subHeading, subCount, theme = 'light', width}: props){
    return (
        <div className={styles.container} style={theme === 'light' ? {color: 'black', backgroundColor: 'var(--silver-color-light)', width} : {color: 'white', backgroundColor: 'var(--blue-color-dark)', width}}>
            <div className={styles.heading}>
                {heading}
            </div>
            <div className={styles.count}>
                {count}
            </div>
            <div className={styles["sub-heading"]}>
                {subHeading} - <strong>{subCount}</strong>
            </div>
            <div className={styles.view}>
                <ViewText />
            </div>
        </div>
    )
}

export default CountedData;