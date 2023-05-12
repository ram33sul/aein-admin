import styles from './Loading.module.css';

interface Props {
    color: 'white' | 'black' | 'blue' | 'green' | 'red';
    scale?: string;
}
function Loading({color, scale}: Props){
    return (
        <div className={styles.container}>
            <div className={styles.loader} style={{borderTopColor: color, borderBottomColor: color, scale}}>

            </div>
        </div>
    )
}

export default Loading;