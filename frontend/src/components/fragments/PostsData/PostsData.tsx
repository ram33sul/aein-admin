import { useNavigate } from 'react-router-dom';
import useApi from '../../../customHooks/api';
import Table from '../../general/Table/Table';
import styles from './PostsData.module.css';

interface PostedData {
    _id: string;
    userId: string;
    postedAt: Date;
    likes: string[];
    dislikes: string[];
}

interface TableData {
    id: string;
    userId: string;
    time: string | Date;
    likes: number;
    dislikes: number;
    onClick: () => void
}

function PostsData() {

    const navigate = useNavigate()
    const [ postsData, postsDataError, postsDataLoading ] = useApi<PostedData[]>({
        url: '/postsData'
    })

    const tableData: TableData[] = postsData?.map(({_id, userId, postedAt, likes, dislikes}) => {
        return {
            id: _id.slice(15),
            userId: userId.slice(15),
            time: new Date(postedAt).toLocaleString(),
            likes: likes.length,
            dislikes: dislikes.length,
            onClick: () => navigate(`/posts/postDetails?id=${_id}`)
        }
    }) ?? []
    
    return (
        <div className={styles.container}>
            <Table headings={["id", "userId", "time", "likes", "dislikes"]} datas={tableData} />
        </div>
    )
}

export default PostsData;