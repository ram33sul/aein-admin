import styles from './Home.module.css'
import Navbar from '../../components/fragments/Navbar/Navbar'
import Header from '../../components/fragments/Header/Header'
import { Routes, Route, useLocation } from 'react-router-dom';
import PageContent from '../../components/fragments/PageContent/PageContent';

function Home(){
    const location = useLocation();
    const route = location.pathname.split('/')[1];
    const pages: string[] = [
        'dashboard',
        'users',
        'posts',
        'messages',
        'support',
        'notifications',
        'settings'
    ]
    
    return(
        <div className={styles.container}>
            <Navbar
                icons={pages}
                active={route}
                index={pages.indexOf(route)}
            />
            <div className={styles['header-content-wrapper']}>
                <Header />
                <Routes>
                    {
                        pages.map((page) => {
                            return  <Route key={page} path={page} element={ <PageContent page={page}/>} />
                        })
                    }
                </Routes>
            </div>
        </div>
    )
}

export default Home;