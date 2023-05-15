import styles from './Dashboard.module.css'
import CountedData from '../../general/CountedData/CountedData';
import BarChart from '../../general/BarChart/BarChart';
import PieChart from '../../general/PieChart/PieChart';
import useApi from '../../../customHooks/api';

interface Users {
    totalUsers: number,
    totalUsersToday: number
}

interface Posts {
    totalPosts: number,
    totalPostsToday: number
}

interface Messages {
    onlineUsers: number,
    messagedUsersToday: number,
    totalMessages: number,
    totalMessagesToday: number
}

function Dashboard(){
    const chartData: [string, number][] = [
        ['monday', 34],
        ['tuesday', 78],
        ['wednesday', 45],
        ['thursday', 32],
        ['friday', 2],
        ['saturday', 34],
        ['sunday', 25]
    ]

    const mood = [
        {
            name: 'humour',
            color: 'red',
            count: 9834
        },
        {
            name: 'happy',
            color: 'blue',
            count: 4532
        },
        {
            name: 'sad',
            color: 'green',
            count: 3432
        },
        {
            name: 'alert',
            color: 'orange',
            count: 934
        },
        {
            name: 'fact',
            color: 'yellow',
            count: 454
        }
    ]

    const [ messages, messagesError, messagesLoading ] = useApi<Messages>({
        url: '/messagesCount'
    })
    
    const [ posts, postsError, postsLoading ] = useApi<Posts>({
        url: '/postsCount'
    })

    const [ users, usersError, usersLoading ] = useApi<Users>({
        url: '/usersCount'
    })

    return (
        <div className={styles.container}>
            <div className={styles['left-part']}>
                <div className={styles['left-part-1']}>
                    <CountedData
                        heading={'Total count of Users'}
                        count={users?.totalUsers ?? 0}
                        subHeading={'New users today'}
                        subCount={users?.totalUsersToday ?? 0}
                        theme={'dark'}
                        width='100%'
                        loading={usersLoading}
                        error={usersError ? true : false}
                    />
                </div>
                <div className={styles['left-part-1']}>
                    <CountedData
                        heading={'Count of Online Users'}
                        count={messages?.onlineUsers ?? 0}
                        subHeading={'Users used messaging'}
                        subCount={messages?.messagedUsersToday ?? 0}
                        theme={'light'}
                        width='100%'
                        loading={messagesLoading}
                        error={messagesError ? true : false}
                    />
                </div>
                <div className={styles['left-part-2']}>
                    <BarChart chartData={chartData} heading={'New users chart'}/>
                </div>
                <div className={styles['left-part-1']}>
                    <CountedData
                        heading={'Total post count'}
                        count={posts?.totalPosts ?? 0}
                        subHeading={'Posts made today'}
                        subCount={posts?.totalPostsToday ?? 0}
                        width='100%'
                        loading={postsLoading}
                        error={postsError ? true : false}
                        />
                </div>
                <div className={styles['left-part-1']}>
                    <CountedData
                        heading={'Total post Interactions'}
                        count={34245}
                        subHeading={'Interactions on posts today'}
                        subCount={3434}
                        width='100%'
                        loading={false}
                        />
                </div>  
                <div className={styles['left-part-1']}>
                    <CountedData
                        heading={'Total Messages Count'}
                        count={messages?.totalMessages ?? 0}
                        subHeading={'Messages count today'}
                        subCount={messages?.totalMessagesToday ?? 0}
                        width='100%'
                        loading={messagesLoading}
                        error={messagesError ? true : false}
                        />
                </div>
                <div className={styles['left-part-1']}>
                    <CountedData
                        heading={'Total Reports Count'}
                        count={342453}
                        subHeading={'Reports count today'}
                        subCount={3434}
                        width='100%'
                        loading={false}
                        />
                </div>
            </div>
            <div className={styles['right-part']}>
                <div className={styles['right-part-2']}>
                    <PieChart data={mood} heading='Mood usage comparison' height={'100%'}/>
                </div>
                <div className={styles['right-part-bottom']}>
                    <div className={styles['right-part-1']}>
                        <CountedData
                            heading={'Total mood usage today'}
                            count={3443}
                            subHeading={'Most used mood'}
                            subCount={'humour'}
                            theme='dark'
                            width='100%'
                            loading={false}
                            />
                    </div>
                    <div className={styles['right-part-1']}>
                        <CountedData
                            heading={'Users who hasn\'t used mood'}
                            count={342453}
                            subHeading={'used less than 5 times'}
                            subCount={3434}
                            width='100%'
                            loading={false}
                            />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;