import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './PostDetails.module.css';
import { useEffect } from 'react';
import useApi from '../../../customHooks/api';
import useAlert from '../../../customHooks/alert';
import Loading from '../../general/Loading/Loading';
import ErrorMessage from '../../general/ErrorMessage/ErrorMessage';
import ButtonOne from '../../general/ButtonOne/ButtonOne';
import ButtonTwo from '../../general/ButtonTwo/ButtonTwo';

interface Post {
    _id: string;
    userId: string;
    withUserId: string;
    postedAt: Date;
    status: boolean;
    messages: {}[];
    likes: string[];
    dislikes: string[];
    commentsCount: number;
    repliesCount: number;
    sharesCount: number;
}
function PostDetails(){


    const navigate = useNavigate()
    const [ searchParams ] = useSearchParams();
    const id = searchParams.get("id");

    const { alert, AlertComponent } = useAlert();

    const [ post, postError, postLoading, fetchPost ] = useApi<Post>({
        url: `/postDetails?id=${id}`,
    })

    const [ block, blockError, blockLoading, doBlock ] = useApi<Post>({
        url: `/postBlock?id=${id}`,
        options: {
            method: "GET"
        },
        fetch: false
    })

    const [ unblock, unblockError, unblockLoading, doUnblock ] = useApi<Post>({
        url: `/postUnblock?id=${id}`,
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
            fetchPost();
            alert({
                backgroundColor: 'green',
                message: "Post blocked successfully"
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[block])

    useEffect(() => {
        if(unblock){
            fetchPost();
            alert({
                backgroundColor: 'green',
                message: "Post unblocked successfully"
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[unblock])

    useEffect(() => {
        if(blockError){
            alert({
                backgroundColor: "red",
                message: "Error occured while blocking post"
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[blockError])

    useEffect(() => {
        if(unblockError){
            alert({
                backgroundColor: "red",
                message: "Error occured while unblocking post"
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
                postLoading ? <Loading color='black'/> :
                postError ? <ErrorMessage text='Error occured while fetching post details' /> :
            <div className={styles.wrapper}>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        Post Id:
                    </div>
                    <div className={styles["value"]}>
                        {post?._id}
                    </div>
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        user Id:
                    </div>
                    <div className={styles["value"]}>
                        {post?.userId}
                    </div>
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        with user Id:
                    </div>
                    <div className={styles["value"]}>
                        {post?.withUserId}
                    </div>
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        Messages count:
                    </div>
                    <div className={styles["value"]}>
                        {post?.messages.length}
                    </div>
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        Posted at:
                    </div>
                    <div className={styles["value"]}>
                        {new Date(post?.postedAt ?? 0).toLocaleString()}
                    </div>
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        Status:
                    </div>
                    <div className={styles["value"]}>
                        {
                            post?.status ?
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
                        Likes count:
                    </div>
                    <div className={styles["value"]}>
                        {post?.likes.length}
                    </div>
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        Dislikes count:
                    </div>
                    <div className={styles["value"]}>
                        {post?.dislikes.length}
                    </div>
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        Comments count:
                    </div>
                    <div className={styles["value"]}>
                        {post?.commentsCount}
                    </div>
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        Replies count:
                    </div>
                    <div className={styles["value"]}>
                        {post?.repliesCount}
                    </div>
                </div>
                <div className={styles["contents"]}>
                    <div className={styles["field"]}>
                        Shares count:
                    </div>
                    <div className={styles["value"]}>
                        {post?.sharesCount}
                    </div>
                </div>
                <div className={styles["buttons-container"]}>
                    <ButtonOne
                        text='GO BACK'
                        onClick={() => navigate(-1)}
                        width='50%'
                    />
                    {
                        post?.status ?
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

export default PostDetails;