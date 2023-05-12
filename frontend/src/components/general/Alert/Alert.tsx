import styles from './Alert.module.css';

export interface Props {
    backgroundColor: string;
    message: string;
}

function Alert({backgroundColor, message}: Props): JSX.Element{

    backgroundColor = `var(--${backgroundColor}-color)`;
    return (
        <div className={styles.container} style={{backgroundColor}}>
            {message}
        </div>
    )
}

export default Alert;