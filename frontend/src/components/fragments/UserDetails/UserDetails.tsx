import { useNavigate, useSearchParams } from 'react-router-dom';
import useApi from '../../../customHooks/api';
import styles from './UserDetails.module.css';
import ButtonOne from '../../general/ButtonOne/ButtonOne';
import ButtonTwo from '../../general/ButtonTwo/ButtonTwo';
import Loading from '../../general/Loading/Loading';
import { useEffect } from 'react';
import useAlert from '../../../customHooks/alert';
import ErrorMessage from '../../general/ErrorMessage/ErrorMessage';

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

    const navigate = useNavigate();
    const { alert, AlertComponent } = useAlert();

    const [ searchParams ] = useSearchParams();
    const id = searchParams.get('id')

    const [ user, userError, userLoading, fetchUser ] = useApi<User>({
        url: `/userDetails?id=${id}`
    })

    const [ block, blockError, blockLoading, doBlock ] = useApi<User>({
        url: `/blockUser?id=${id}`,
        options: {
            method: 'GET'
        },
        fetch: false
    })

    const [ unblock, unblockError, unblockLoading, doUnblock ] = useApi<User>({
        url: `/unblockUser?id=${id}`,
        options: {
            method: "GET"
        },
        fetch: false
    })

    const handleBlock = () => {
        doBlock();
    }

    const handleUnblock = () => {
        doUnblock()
    }

    useEffect(() => {
        if(block){
            fetchUser();
            alert({
                backgroundColor: 'green',
                message: "User blocked successfully"
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[block])

    useEffect(() => {
        if(unblock){
            fetchUser();
            alert({
                backgroundColor: 'green',
                message: "User unblocked successfully"
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[unblock])

    useEffect(() => {
        if(blockError){
            alert({
                backgroundColor: "red",
                message: "Error occured while blocking user"
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[blockError])

    useEffect(() => {
        if(unblockError){
            alert({
                backgroundColor: "red",
                message: "Error occured while unblocking user"
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[unblockError])

    return (
        <div className={styles.container}>
            {
                AlertComponent
            }
            {
                userLoading ? <Loading color='black'/> :
                userError ? <ErrorMessage text='Error occured while fetching user data' /> :
            <div className={styles.wrapper}>
                <div className={styles["image-container"]}>
                    {
                        user?.profilePicUrl ?
                        <img src={user?.profilePicUrl} alt='none' className={styles.image}/> :
                        "No profile pic"
                    }
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        id:
                    </div>
                    <div className={styles["value"]}>
                        {user?._id}
                    </div>
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        Name:
                    </div>
                    <div className={styles["value"]}>
                        {user?.name}
                    </div>
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        Username:
                    </div>
                    <div className={styles["value"]}>
                        {user?.username}
                    </div>
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        Email:
                    </div>
                    <div className={styles["value"]}>
                        {user?.email}
                    </div>
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        Mobile:
                    </div>
                    <div className={styles["value"]}>
                        {user?.mobile}
                    </div>
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        Created at:
                    </div>
                    <div className={styles["value"]}>
                        {new Date(user?.createdAt ?? 0).toLocaleString()}
                    </div>
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        Status:
                    </div>
                    <div className={styles["value"]}>
                        {
                            user?.status ?
                            <span style={{color: 'green'}}>
                                Active
                            </span> :
                            <span style={{color: 'red'}}>
                                Not-active
                            </span>
                        }
                    </div>
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        Followers:
                    </div>
                    <div className={styles["value"]}>
                        {user?.followers.length}
                    </div>
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        Following:
                    </div>
                    <div className={styles["value"]}>
                        {user?.following.length}
                    </div>
                </div>
                <div className={styles["buttons-container"]}>
                    <ButtonOne
                        text='GO BACK'
                        onClick={() => navigate(-1)}
                        width='50%'
                    />
                    {
                        user?.status ?
                        <ButtonTwo
                            text='BLOCK'
                            onClick={handleBlock}
                            width='50%'
                            loading={blockLoading}
                        /> :
                        <ButtonTwo
                            text='UNBLOCK'
                            onClick={handleUnblock}
                            width='50%'
                            loading={unblockLoading}
                        />
                    }
                </div>
            </div>
            }
        </div>
    )
}

export default UserDetails;