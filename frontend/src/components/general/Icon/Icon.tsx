import styles from './Icon.module.css';

type props = {
    icon: string,
    active?: boolean,
    color: 'white' | 'black',
    size?: string,
    onClick?: () => (void | object);
}

function Icon({icon, active = false, color ,size = '30px', onClick}: props){

    const src = require(`../../../images/icons/${icon}-${color}.png`);
    return (
        <img src={src} alt={icon} style={{maxWidth: size, maxHeight: size, filter: active ? 'brightness(0%)' : ''}} className={styles.image} onClick={onClick}/> 
    )
};

export default Icon;