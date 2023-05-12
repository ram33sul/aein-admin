import styles from './Moods.module.css';
import useApi from '../../../customHooks/api';
import { useEffect, useMemo } from 'react';
import PieChart from '../../general/PieChart/PieChart';
import CountedData from '../../general/CountedData/CountedData';
import ButtonOne from '../../general/ButtonOne/ButtonOne';

function Moods() {

    interface Mood {
        _id: string, 
        name: string, 
        color: string,
        count: number,
        status: boolean
    }
    const [ moods, moodsError, moodsLoading ] = useApi<Mood[]>({
        url: '/moodsDetails'
    })

    const totalCount: number = useMemo(() => {
        return moods?.reduce((acc, {count}) => acc + count, 0) ?? 0
    },[moods])

    const mostUsed = useMemo(() => {
        return moods?.reduce((acc, curr) => curr.count > acc.count ? curr : acc, moods[0])
    },[moods])
    
    const mostUsedMood = `Most used mood is ${mostUsed?.name ?? 'no mood'}`;

    return (
        <div className={styles.container}>
            <div className={styles["pie-chart"]}>
                <PieChart heading='Mood usage comparison' height='100%' data={moods ?? []} />
            </div>
            <div className={styles["section-right"]}>
                 <div className={styles["button-wrapper"]}>
                    <ButtonOne text='More details' width='100%' height='50%' type='reject' borderRadius='20px' />
                    <ButtonOne text='Add new mood' width='100%' height='50%' borderRadius='20px'/>
                </div>
                <div className={styles["total-count-component"]}>
                    <CountedData
                        heading='Total count of mood usage'
                        count={totalCount}
                        subHeading={mostUsedMood}
                        subCount={mostUsed?.count ?? 0}
                        loading={moodsLoading}
                        theme='dark'
                        width='100%'
                        height='100%'
                        />
                </div>
            </div>
        </div>
    )
}

export default Moods;