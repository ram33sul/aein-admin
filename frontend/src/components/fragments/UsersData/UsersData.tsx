import { useNavigate } from 'react-router-dom';
import useApi from '../../../customHooks/api';
import Table from '../../general/Table/Table';
import styles from './UsersData.module.css';

interface User {
    _id: string;
    username: string;
    status: boolean;
    mobile: number;
}

interface TableData {
    id: string; 
    username: string;
    status: string;
    mobile: number;
    onClick: () => void;
}
function UsersData() {

    const navigate = useNavigate()
    const [ usersData, usersDataError, usersDataLoading ] = useApi<User[]>({
        url: '/usersData'
    })

    const tableData: TableData[] = usersData?.map(({_id, username, status, mobile}) => {
        return {
            id: _id,
            username,
            mobile,
            status: status ? "Active" : "Not-active",
            onClick: () => navigate(`/users/userDetails?id=${_id}`)
        }
    }) ?? []

    return (
        <div className={styles.container}>
            <Table headings={["id", "username", "status", "mobile"]} datas={tableData} />
        </div>
    )
}

export default UsersData;