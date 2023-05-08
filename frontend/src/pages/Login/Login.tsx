import { useState } from 'react';
import Input from '../../components/general/Input/Input';
import styles from './Login.module.css';
import Icon from '../../components/general/Icon/Icon';
import ButtonOne from '../../components/general/ButtonOne/Button';
import axios from 'axios';
import { InputEventType } from '../../types/other';

function Login() {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ usernameError, setUsernameError ] = useState('');
    const [ passwordError, setPasswordError ] = useState('');

    const handleSubmit = () => {
        if(username !== '' && password !== ''){
            axios.post('/login', {
                username,
                password
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            })
        }
        if(username === ''){
            setUsernameError('Username is required')
        }
        if(password === ''){
            setPasswordError('Password is required')
        }
    }

    const handleUsernameChange = (e: InputEventType) => {
        setUsernameError('');
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e: InputEventType) => {
        setPasswordError('');
        setPassword(e.target.value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Icon icon='aein' size='80px' color='black'/>
            </div>
            <div className={styles.form}>
                <div className={styles["form-headings-wrapper"]}>
                    <div className={styles["form-heading"]}>
                        Welcome Back!
                    </div>
                    <div className={styles["form-sub-heading"]}>
                        Login to continue
                    </div>
                </div>
                <div className={styles["input-wrapper"]}>
                    <Input error={usernameError} label='Username' placeholder='' width='100%' value={username} onChange={handleUsernameChange} />
                    <Input error={passwordError} label='Password' placeholder='' type='password' width='100%' value={password} onChange={handlePasswordChange} />
                </div>
                <div className={styles["button-wrapper"]}>
                    <ButtonOne
                        text='LOGIN'
                        width='50%'
                        height='100%'
                        onClick={handleSubmit}
                        />
                    <div className={styles["forgot-password-button"]}>
                        FORGOT PASSWORD?
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;