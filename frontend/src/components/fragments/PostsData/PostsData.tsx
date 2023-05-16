import { useNavigate } from 'react-router-dom';
import useApi from '../../../customHooks/api';
import Table from '../../general/Table/Table';
import styles from './PostsData.module.css';
import Loading from '../../general/Loading/Loading';
import ErrorMessage from '../../general/ErrorMessage/ErrorMessage';

interface PostedData {
    _id: string;
    userId: string;
    postedAt: Date;
    status: boolean
}

interface TableData {
    id: string;
    userId: string;
    time: string | Date;
    status: string
    onClick: () => void
}

function PostsData() {

    const navigate = useNavigate()
    const [ postsData, postsDataError, postsDataLoading ] = useApi<PostedData[]>({
        url: '/postsData'
    })

    const tableData: TableData[] = postsData?.map(({_id, userId, postedAt, status}) => {
        return {
            id: _id.slice(15),
            userId: userId.slice(15),
            time: new Date(postedAt).toLocaleString(),
            status: status ? 'Active' : 'Not-active' ,
            onClick: () => navigate(`/posts/postDetails?id=${_id}`)
        }
    }) ?? []
    
    return (
        <div className={styles.container}>
            {
                postsDataLoading ? <Loading color='black'/> :
                postsDataError ? <ErrorMessage text='Error while fetching posts data' /> :
            <Table headings={["id", "userId", "time", "status"]} datas={tableData} />}
        </div>
    )
}

export default PostsData;