import { useNavigate } from 'react-router-dom';
import ButtonOne from '../../general/ButtonOne/ButtonOne';
import Container from '../../general/Container/Container';
import Input from '../../general/Input/Input';
import styles from './AddNewMood.module.css';
import { ChangeEvent, useEffect, useState } from 'react';
import useApi from '../../../customHooks/api';
import useAlert from '../../../customHooks/alert';

function AddNewMood(){

    const navigate = useNavigate();

    const [ name, setName ] = useState<string>('');
    const [ color, setColor ] = useState<string>('');

    const [ nameError, setNameError ] = useState<string>('');
    const [ colorError, setColorError ] = useState<string>('');

    const { AlertComponent, alert } = useAlert();
    
    const [ submitResponse, submitError, submitLoading, submitShouldFetch ] = useApi({
        url:'/addMood',
        options: {
            method: 'POST',
            data: {
                name,
                color
            }
        },
        fetch: false
    })

    const handleSubmit: () => void = () => {
        submitShouldFetch(true);
    }

    const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNameError('');
        submitShouldFetch(false);
        setName(e.target.value);
    }

    const handleColorInput = (e: ChangeEvent<HTMLInputElement>) => {
        setColorError('');
        submitShouldFetch(false);
        setColor(e.target.value);
    }

    useEffect(() => {
        if(submitError){
            if(Array.isArray(submitError.response?.data)){
                submitError.response?.data?.forEach((error) => {
                    if(error?.field === 'name'){
                        setNameError(error.message)
                    } else if (error?.field === 'color'){
                        setColorError(error.message)
                    }
                })
            } else {
                alert({
                    backgroundColor: 'red',
                    message: "Some error occured!"
                })
            }
        }
    }, [submitError])

    useEffect(() => {
        if(submitResponse){
            setName('');
            setColor('');
            alert({
                backgroundColor: 'green',
                message: 'Mood is successfully added'
            })
        }
    },[submitResponse])

    return (
        <div className={styles.container}>
            {
                AlertComponent
            }
            <div className={styles.heading}>
                Add new <strong>Mood</strong>
            </div>
            <Input error={nameError} width='100%' label='Name' value={name} onChange={handleNameInput} />
            <Input error={colorError} width='100%' label='Color' value={color} onChange={handleColorInput} />
            <Container width='100%' gap='10px' height='40px' margin='10px 0'>
                <ButtonOne text='ADD'  width='50%' onClick={handleSubmit} loading={submitLoading}/>
                <ButtonOne text='CANCEL' type='reject' width='50%' onClick={() => navigate('/settings')} />
            </Container>
        </div>
    )
}

export default AddNewMood;