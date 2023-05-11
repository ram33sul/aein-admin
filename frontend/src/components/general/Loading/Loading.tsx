import styles from './Loading.module.css';

interface Props {
    color: 'white' | 'black' | 'blue' | 'green' | 'red';
}
function Loading({color}: Props){
    return (
        <div className={styles.container}>
            <div className={styles.loader} style={{borderTopColor: color, borderBottomColor: color}}>

            </div>
        </div>
    )
}

export default Loading;