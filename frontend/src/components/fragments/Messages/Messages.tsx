import useApi from '../../../customHooks/api';
import styles from './Messages.module.css'; 
import { Mood } from '../../../interfaces';
import CountedData from '../../general/CountedData/CountedData';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonOne from '../../general/ButtonOne/ButtonOne';

interface Messages {
    onlineUsers: number,
    messagedUsersToday: number,
    totalMessages: number,
    totalMessagesToday: number
}
       

function Messsages(){

    const navigate = useNavigate()

    const [ messages, messagesError, messagesLoading ] = useApi<Messages>({
        url: '/messagesCount'
    })



    return (
        <div className={styles.container}>
                <CountedData 
                    loading={messagesLoading}
                    heading="Total messages count"
                    count={messages?.totalMessages ?? 0}
                    subHeading='Total messages today'
                    subCount={messages?.totalMessagesToday ?? 0}
                    width='100%'
                    error={messagesError ? true : false}
                />
                <CountedData 
                    loading={messagesLoading}
                    heading="Count of online users"
                    count={messages?.onlineUsers ?? 0}
                    subHeading='Users who used messaging'
                    subCount={messages?.messagedUsersToday ?? 0}
                    width='100%'
                    error={messagesError ? true : false}
                />
                    <ButtonOne 
                        text='Moods details'
                        onClick={() => navigate('/messages/moods')}
                        width='100%'
                        borderRadius='20px'
                        height='100px'
                    />
        </div>
    )
}

export default Messsages;