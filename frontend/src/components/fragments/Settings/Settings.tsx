import { useNavigate } from 'react-router-dom';
import ButtonTwo from '../../general/ButtonTwo/ButtonTwo';
import SettingsList from '../../general/SettingsList/SettingsList';
import styles from './Settings.module.css';

function Settings(){

    const navigate = useNavigate()
    return(
        <div className={styles.container}>
            <SettingsList heading='Moods'>
                <ButtonTwo
                    text='Add new mood'
                    width='fit-content'
                    height='fit-content'
                    onClick={() => navigate('/settings/addNewMood')}
                    />
                <ButtonTwo
                    text='More Details'
                    width='fit-content'
                    height='fit-content'
                    onClick={() => navigate('/moods')}
                    />
            </SettingsList>
        </div>
    )
}

export default Settings;