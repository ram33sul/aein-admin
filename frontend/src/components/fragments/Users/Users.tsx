import styles from './Users.module.css';
import CountedData from '../../general/CountedData/CountedData';
import BarChart from '../../general/BarChart/BarChart';
import useApi from '../../../customHooks/api';
import ButtonOne from '../../general/ButtonOne/ButtonOne';
import { useNavigate } from 'react-router-dom';

interface Messages {
    onlineUsers: number,
    messagedUsersToday: number,
    totalMessages: number,
    totalMessagesToday: number
}

interface Users {
    totalUsers: number,
    totalUsersToday: number
}

function Users(){

    const navigate = useNavigate();

    const chartData: [string, number][] = [
        ['monday', 34],
        ['tuesday', 78],
        ['wednesday', 45],
        ['thursday', 32],
        ['friday', 2],
        ['saturday', 34],
        ['sunday', 25],
        ['wednesday2', 45],
        ['thursday2', 32],
        ['friday2', 2],
        ['saturday2', 34],
        ['sunday2', 25]
    ]

    const [ users, usersError, usersLoading ] = useApi<Users>({
        url: '/usersCount'
    })

    const [ messages, messagesError, messagesLoading ] = useApi<Messages>({
        url: '/messagesCount'
    })

    return(
        <div className={styles.container}>
            <div className={styles['section-1']}>
                <div className={styles['count-data']}>
                    <CountedData
                        heading='Total number of users'
                        count={users?.totalUsers ?? 0}
                        subHeading='New users today'
                        subCount={users?.totalUsersToday ?? 0}
                        width='100%'
                        loading={usersLoading}
                        error={usersError ? true : false}
                        />
                </div>
                <div className={styles['count-data']}>
                    <CountedData
                        heading='Count of online users'
                        count={messages?.onlineUsers ?? 0}
                        subHeading='users who used messaging'
                        subCount={messages?.messagedUsersToday ?? 0}
                        width='100%'
                        loading={messagesLoading}
                        error={messagesError ? true : false}
                        />
                </div>
                <div className={styles['count-data']}>
                    <ButtonOne
                        text='View users data'
                        onClick={() => navigate('/users/usersData')}
                        width='100%'
                        height='100%'
                        borderRadius='20px'
                        />
                </div>
            </div>
            <div className={styles['section-2']}>
                <BarChart
                    heading=''
                    chartData={chartData}
                    />
            </div>
        </div>
    )
}

export default Users;