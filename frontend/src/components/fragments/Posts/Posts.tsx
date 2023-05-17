import { useNavigate } from 'react-router-dom';
import useApi from '../../../customHooks/api';
import ButtonOne from '../../general/ButtonOne/ButtonOne';
import CountedData from '../../general/CountedData/CountedData';
import styles from './Posts.module.css';
import BarChart from '../../general/BarChart/BarChart';

interface Posts {
    totalPosts: number,
    totalPostsToday: number
}

interface PostsInteractions {
    likesCount: number;
    dislikesCount: number;
    commentsCount: number;
    repliesCount: number;
    sharesCount: number;
}

function Posts(){

    const navigate = useNavigate();

    const [ postsCount, postsCountError, postsCountLoading ] = useApi<Posts>({
        url: '/postsCount'
    })

    const [ postsInteractions, postsInteractionsError, postsInteractionsLoading ] = useApi<PostsInteractions>({
        url: '/postsInteractionsCount'
    })

    const chartData: [string,number][] = Object.entries(postsInteractions ?? {
        likesCount: 0,
        dislikesCount: 0,
        commentsCount: 0,
        repliesCount: 0,
        sharesCount: 0
    }).filter((arr) => arr[0] !== '_id').map((arr) => {
        return [arr[0].split('Count')[0], arr[1]]
    })

    return (
        <div className={styles.container}>
            <div className={styles["left-part"]}>
                <div className={styles["left-top-part"]}>
                    <CountedData
                        loading={postsCountLoading}
                        heading='Total number of posts'
                        subHeading='Total number of posts today'
                        count={postsCount?.totalPosts ?? 0}
                        subCount={postsCount?.totalPostsToday ?? 0}
                        error={postsCountError ? true : false}
                        width='100%'
                        onClick={() => navigate('/posts/postsData')}
                    />
                </div>
                <div className={styles["left-bottom-part"]}>
                    <ButtonOne
                        text='View posts data'
                        onClick={() => navigate('/posts/postsData')}
                        height='100%'
                        borderRadius='20px'
                    />
                </div>
            </div>
            <div className={styles["right-part"]}>
                <BarChart 
                    heading='Posts interactions'
                    chartData={chartData}
                    onClick={() => navigate('/posts/postsData')}
                />
            </div>
        </div>
    )
}

export default Posts;