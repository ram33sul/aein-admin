import { useNavigate } from 'react-router-dom';
import useApi from '../../../customHooks/api';
import { Mood } from '../../../interfaces';
import Table from '../../general/Table/Table';
import styles from './MoodsData.module.css';
import { useMemo } from 'react';

interface TableData extends Omit<Mood, "status"> {
    status: string,
    rowColor: string,
    onClick: () => void
}

function MoodsData(){

    const [ moods, moodsError, moodsLoading ] = useApi<Mood[]>({
        url: '/moodsDetails'
    })

    const navigate = useNavigate();

    const tableData: TableData[] = useMemo(() => moods?.map(mood => {
        return {
            ...mood,
            rowColor: mood.color,
            status: mood.status ? "Active" : "Not-active",
            onClick: () =>  navigate(`/messages/moodDetails?id=${mood._id}`)
        }
    }),[moods]) ?? [];

    return(
        <div className={styles.container}>
            <Table datas={tableData} headings={["name", "color", "count", "status"]}/>
        </div>
    )
}

export default MoodsData;