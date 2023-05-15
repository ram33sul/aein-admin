import { useNavigate, useSearchParams } from 'react-router-dom';
import useApi from '../../../customHooks/api';
import { Mood } from '../../../interfaces';
import styles from './MoodDetails.module.css';
import Loading from '../../general/Loading/Loading';
import Input from '../../general/Input/Input';
import { ChangeEvent, useEffect, useState } from 'react';
import ErrorMessage from '../../general/ErrorMessage/ErrorMessage';
import ButtonOne from '../../general/ButtonOne/ButtonOne';
import useAlert from '../../../customHooks/alert';
import ButtonTwo from '../../general/ButtonTwo/ButtonTwo';

function MoodDetails() {

    const [ searchParams ] = useSearchParams();
    const id = searchParams.get("id");

    const navigate = useNavigate()

    const [ mood, moodError, moodLoading ] = useApi<Mood>({
        url: `/moodDetails?id=${id}`
    })

    const [ name, setName ] = useState<string>('');
    const [ color, setColor ] = useState<string>('');
    const [ status, setStatus ] = useState<boolean>(false);
    const [ editting, setEditting ] = useState<boolean>(false);

    const [ nameError, setNameError ] = useState<string>('');
    const [ colorError, setColorError ] = useState<string>('');

    const { alert, AlertComponent } = useAlert();

    const [ removeMood, removeMoodError, removeMoodLoading, doRemoveMood ]  = useApi<Mood>({
        url: '/removeMood',
        options: {
            data: {
                id
            },
            method: 'PATCH'
        },
        fetch: false
    })

    const [ recallMood, recallMoodError, recallMoodLoading, doRecallMood ] = useApi<Mood>({
        url: '/recallMood',
        options: {
            data: {
                id
            },
            method: 'PATCH'
        },
        fetch: false
    })

    const [ saveEditMood , saveEditMoodError, saveEditMoodLoading, doSaveEditMood ] = useApi<Mood>({
        url: '/editMood',
        options: {
            data: {
                id,
                name,
                color
            },
            method: 'PATCH'
        },
        fetch: false
    })

    const resetErrors = () => {
        setNameError('');
        setColorError('');
    }
    const handleCancelEdit = () => {
        resetErrors()
        setEditting(false);
        if(mood){
            setName(mood?.name);
            setColor(mood?.color)
            setStatus(mood?.status);
        }
    }

    const handleSaveEdit = () => {
        resetErrors()
        if(name === mood?.name && color === mood?.color){
            alert({
                backgroundColor: 'red',
                message: "No changes to save"
            })
        } else {
            doSaveEditMood()
        }
    }

    const handleRemove = () => {
        doRemoveMood();
    }

    const handleRecall = () => {
        doRecallMood()
    }

    useEffect(() => {
        resetErrors()
        if(mood){
            setName(mood?.name);
            setColor(mood?.color)
            setStatus(mood?.status);
        }
    },[mood]);

    useEffect(() => {
        resetErrors()
        if(removeMood){
            setStatus(removeMood.status);
            alert({
                backgroundColor: 'green',
                message: `Mood successfully removed`
            })
        } else if (removeMoodError){
            alert({
                backgroundColor: "red",
                message: "Some error occured while removing"
            })
        }
    },[removeMood, removeMoodError])

    useEffect(() => {
        resetErrors()
        if(recallMood){
            setStatus(recallMood.status)
            alert({
                backgroundColor: 'green',
                message: `Mood successfully recalled`
            })
        } else if (recallMoodError){
            alert({
                backgroundColor: "red",
                message: "Some error occured while recalling"
            })
        }
    },[recallMood, recallMoodError])

    useEffect(() => {
        if(saveEditMood){
            setName(saveEditMood.name);
            setColor(saveEditMood.color);
            setEditting(false)
            alert({
                backgroundColor: 'green',
                message: 'Mood successfully edited'
            })
        } else if (saveEditMoodError){
            if(Array.isArray(saveEditMoodError.response?.data)){
                const errors: [] = saveEditMoodError.response?.data as [];
                errors.forEach((error: {field: string, message: string}) => {
                    if(error.field === 'name'){
                        setNameError(error.message)
                    } else if (error.field === 'color'){
                        setColorError(error.message)
                    }
                })
            } else {
                alert({
                    backgroundColor: "red",
                    message: "Some error occured while saving"
                })
            }
        }
    },[saveEditMood, saveEditMoodError])

    return (
        <div className={styles.container}>
            {
                AlertComponent
            }
            {   
                moodError ? <ErrorMessage text='Some error occured' /> :
                moodLoading ? <Loading color='black' /> : <>
                <div className={styles["data-container"]}>
                    <div className={styles.id}>
                        Id: <strong style={{color}}>{mood?._id ?? ''}</strong>
                    </div>
                    <div className={styles.status}>
                        Status: <strong style={{color: status ? 'green' : 'red'}}>{status ? 'Active' : 'Not-active'}</strong>
                    </div>
                    <Input error={nameError} readonly={!editting} width='100%' label='Name' value={name} onChange={(e: ChangeEvent<HTMLInputElement>) =>{ setNameError(''); setName(e.target.value)}} />
                    <Input error={colorError} readonly={!editting} width='100%' label='Color' value={color} onChange={(e: ChangeEvent<HTMLInputElement>) =>{ setColorError(''); setColor(e.target.value)}} />
                    {
                        !editting ?
                        <div className={styles["buttons-container"]}>
                            <ButtonOne width='50%' text='Edit' onClick={() => setEditting(true)}/>
                            {
                                status ?
                                <ButtonOne loading={removeMoodLoading} width='50%' color='red' text='Remove' type='reject' onClick={handleRemove}/> :
                                <ButtonOne loading={recallMoodLoading} width='50%' color='green' text='Recall' type='reject' onClick={handleRecall}/>
                            }
                        </div> :
                            <div className={styles["buttons-container"]}>
                            <ButtonOne loading={saveEditMoodLoading} width='50%' text='Save' onClick={handleSaveEdit}/>
                            <ButtonOne width='50%' text='Cancel' type='reject' onClick={handleCancelEdit}/>
                        </div>
                    }
                    <ButtonTwo text='GO BACK' onClick={() => navigate(-1)} />
                </div> </>
            }
        </div>
    )
}

export default MoodDetails;