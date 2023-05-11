import { useNavigate } from 'react-router-dom';
import ButtonOne from '../../components/general/ButtonOne/ButtonOne';
import ButtonTwo from '../../components/general/ButtonTwo/ButtonTwo';
import Container from '../../components/general/Container/Container';
import styles from './ErrorPage.module.css';

function ErrorPage(){

    const navigate = useNavigate();

    return(
        <div className={styles.container}>
            <div className={styles.heading}>
                <span style={{color: 'red'}}>Oops!</span> Can't find the page
            </div>
            <div className={styles["sub-heading"]}>
                Sorry, it looks like the page you're looking for is not present or you entered an invalid url.
                Try going back or go to home page.
            </div>
            <Container height='40px' width='fit-content' gap='20px' margin='20px 0'>
                <ButtonOne text='Go Back' padding='10px 15px' width='fit-content' height='100%' onClick={() => navigate(-1)} />
                <ButtonTwo text='Go to Dashboard' height='100%' width='fit-content' onClick={() => navigate('/dashboard')}/>
            </Container>
        </div>
    )
}


export default ErrorPage;