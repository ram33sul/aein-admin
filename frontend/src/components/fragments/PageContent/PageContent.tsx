import Loading from '../../general/Loading/Loading';
import styles from './PageContent.module.css';
import React,{ lazy, Suspense} from 'react';

interface ComponentsInterface {
    [key: string]: React.ComponentType<any>;
}

const Components: ComponentsInterface = {
    dashboard: lazy(() => import('../Dashboard/Dashboard')),
    users: lazy(() => import('../Users/Users')),
    settings: lazy(() => import('../Settings/Settings')),
    addNewMood: lazy(() => import('../AddNewMood/AddNewMood')),
    moods: lazy(() => import('../Moods/Moods')),
    moodsData: lazy(() => import('../MoodsData/MoodsData')),
    moodDetails: lazy(() => import('../MoodDetails/MoodDetails')),
    messages: lazy(() => import('../Messages/Messages')),
    posts: lazy(() => import('../Posts/Posts')),
    postsData: lazy(() => import('../PostsData/PostsData')),
    usersData: lazy(() =>  import('../UsersData/UsersData')),
    userDetails: lazy(() => import('../UserDetails/UserDetails'))
}

function PageContent({page}: {page: string}) {
    const Component = Components[page];
    return (
        <div className={styles.container}>
            {
                <Suspense fallback = {<Loading color='black'/>}>
                    {Component ? <Component /> : ""}
                </Suspense>
            }
        </div>
    )
}

export default PageContent;