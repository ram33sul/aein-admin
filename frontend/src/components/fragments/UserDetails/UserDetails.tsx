import { useSearchParams } from 'react-router-dom';
import useApi from '../../../customHooks/api';
import styles from './UserDetails.module.css';

interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    mobile: number;
    createdAt: Date;
    followers: string[];
    following: string[];
    profilePicUrl: string;
    status: boolean;
}
function UserDetails() {

    const [ searchParams ] = useSearchParams();
    const id = searchParams.get('id')

    const [ user, userError, userLoading ] = useApi<User>({
        url: `/userDetails?id=${id}`
    })

    return (
        <div className={styles.container}>
            <div className={styles["image-container"]}>
                {
                    user?.profilePicUrl ?
                    <img src={user?.profilePicUrl} alt='none' /> :
                    "No profile pic"
                }
            </div>
            <div className={styles["content-1"]}>
                Id: <strong>{user?._id}</strong>
            </div>
            <div className={styles["content-1"]}>
                Name: <strong>{user?.name}</strong>
            </div>
            <div className={styles["content-1"]}>
                Username: <strong>{user?.username}</strong>
            </div>
            <div className={styles["content-1"]}>
                Email: <strong>{user?.email}</strong>
            </div>
            <div className={styles["content-1"]}>
                Mobile: <strong>{user?.mobile}</strong>
            </div>
            <div className={styles["content-1"]}>
                Created At: <strong>{user?.email}</strong>
            </div>
            <div className={styles["content-2"]}>
                <div>
                    Followers: <strong>{user?.followers.length}</strong>
                </div>
                <div>
                    Following: <strong>{user?.following.length}</strong>
                </div>
            </div>
            <div className={styles["content-1"]}>
                Status: <strong>{user?.status ? 'Active' : 'Not-active'}</strong>
            </div>
        </div>
    )
}

export default UserDetails;