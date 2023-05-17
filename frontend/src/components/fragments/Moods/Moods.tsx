import styles from './Moods.module.css';
import useApi from '../../../customHooks/api';
import { useEffect, useMemo } from 'react';
import PieChart from '../../general/PieChart/PieChart';
import CountedData from '../../general/CountedData/CountedData';
import ButtonOne from '../../general/ButtonOne/ButtonOne';
import Table from '../../general/Table/Table';
import { useNavigate } from 'react-router-dom';
import { Mood } from '../../../interfaces';

function Moods() {

    interface TableData extends Omit<Mood, 'status'> {
        rowColor: string;
        status: string;
        onClick: () => void;
    }

    const navigate = useNavigate();

    const [ moods, moodsError, moodsLoading ] = useApi<Mood[]>({
        url: '/moodsDetails'
    })

    const totalCount: number = useMemo(() => {
        return moods?.reduce((acc, {count}) => acc + count, 0) ?? 0
    },[moods])

    const mostUsed: Mood | undefined = useMemo(() => {
        return moods?.reduce((acc, curr) => curr.count > acc.count ? curr : acc, moods[0])
    },[moods])
    
    const mostUsedMood: string = `Most used mood is ${mostUsed?.name ?? 'no mood'}`;

    const tableData: TableData[] = useMemo(() =>  moods?.map((mood: Mood) => {
        return {
            ...mood,
            rowColor: mood.color,
            status: mood.status ? "active" : "not-active",
            onClick: () => navigate(`/messages/moodDetails?id=${mood._id}`)
        }
    }), [moods, navigate]) ?? [];

    return (
        <div className={styles.container}>
            <div className={styles["left-part"]}>
                <PieChart onClick={() => navigate('/messages/moodsData')} heading='Mood usage comparison' height='100%' data={moods ?? []} />
            </div>
            <div className={styles["right-part"]}>
                <div className={styles["right-top-part"]}>
                    <div className={styles["right-top-left-part"]}>
                        <ButtonOne text='More details' width='100%' height='50%' type='reject' borderRadius='20px' onClick={() => navigate('/messages/moodsData')} />
                        <ButtonOne text='Add new mood' width='100%' height='50%' borderRadius='20px' onClick={() => navigate('/settings/addNewMood')}/>
                    </div>
                    <div className={styles["right-top-right-part"]}>
                        <CountedData
                            heading='Total count of mood usage'
                            count={totalCount}
                            subHeading={mostUsedMood}
                            subCount={mostUsed?.count ?? 0}
                            loading={moodsLoading}
                            theme='dark'
                            width='100%'
                            height='100%'
                            onClick={() => navigate('/messages/moodsData')}
                            />
                    </div>
                </div>
                <div className={styles["right-bottom-part"]}>
                    <Table headings={["name", "color", "count", "status"]} datas={tableData} />
                </div>
            </div>
        </div>
    )
}

export default Moods;