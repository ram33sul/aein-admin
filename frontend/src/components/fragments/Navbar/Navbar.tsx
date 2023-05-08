import styles from './Navbar.module.css';
import Icon from '../../general/Icon/Icon';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
type props = {
    active: string;
    icons: string[];
    index: number;
}

function Navbar({active, icons, index}: props){

    const navigate = useNavigate();
    const [ activeMarkerPos, setActiveMarkerPos ] = useState(-15);

    useEffect(() => {
        setActiveMarkerPos((index * 60) -15)
    },[index])

    return(
        <div className={styles.container}>
            <div className={styles.logo}>
                <Icon icon={'aein'} color={'white'} size='80px'/>
            </div>
            <div className={styles["icons-wrapper"]}>
                {
                    icons.map((icon) => {
                        return <Icon key={icon} icon={icon} color='white' active={active === icon} onClick={() => navigate(`/${icon}`)} />
                    })
                }
                <div className={styles["active-marker"]} style={{top: `${activeMarkerPos}px`}}>
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar;