import styles from './SettingsList.module.css';

interface props {
    heading: string,
    children: React.ReactNode
}
function SettingsList({heading, children}: props){
    return(
        <div className={styles.container}>
            {children}
            <div className={styles.heading}>
                {heading}
            </div>
        </div>
    )
}

export default SettingsList;