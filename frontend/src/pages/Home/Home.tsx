import styles from './Home.module.css'
import Navbar from '../../components/fragments/Navbar/Navbar'
import Header from '../../components/fragments/Header/Header'
import { Routes, Route, useLocation } from 'react-router-dom';
import PageContent from '../../components/fragments/PageContent/PageContent';
import ErrorPage from '../ErrorPage/ErrorPage';
import OutletHelper from '../../outlet/OutletHelper';

function Home(){
    const location = useLocation();
    const route = location.pathname.split('/')[1];
    const pagesAndSubPages: [string,string[]][] = [
        ['dashboard',[]],
        ['users',[]],
        ['posts',[]],
        ['messages',['moods']],
        ['support',[]],
        ['notifications',[]],
        ['settings',['addNewMood']],
    ]

    const pages = pagesAndSubPages.map(elem => elem[0]);    
    
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
                            return  (
                                <Route key={page} path={page} element={ <OutletHelper />}>
                                    <Route path='' element={ <PageContent page={page}/>} />
                                    {
                                        pagesAndSubPages.filter(elem => elem[0] === page)[0][1].map(subPage => {
                                            return <Route key={subPage} path={subPage} element={ <PageContent page={subPage} />} />
                                        })
                                    }
                                </Route>
                            )
                        })
                    }
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            </div>
        </div>
    )
}

export default Home;