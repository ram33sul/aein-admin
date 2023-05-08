import styles from './Header.module.css'
import SearchInput from '../../general/SearchInput/SearchInput'
import Icon from '../../general/Icon/Icon'
import { useState } from 'react'
function Header(){

    const [ searchValue, setSearchValue ] = useState('');
    return (
        <div className={styles.container}>
            <div className={styles["welcome-text"]}>
                Hello, <strong>Admin</strong>
            </div>
            <SearchInput value={searchValue} onChange={(e) => setSearchValue(e.target.value)} width={'400px'} placeholder={'Search'} />
            <div className={styles["logout-container"]}>
                <div className={styles["logout-text"]}>
                    Logout
                </div>
                <Icon icon={'logout'} color='black' />
            </div>
        </div>
    )
}

export default Header;