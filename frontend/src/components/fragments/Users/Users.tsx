import styles from './Users.module.css';
import CountedData from '../../general/CountedData/CountedData';
import BarChart from '../../general/BarChart/BarChart';
function Users(){
    const chartData: [string, number][] = [
        ['monday', 34],
        ['tuesday', 78],
        ['wednesday', 45],
        ['thursday', 32],
        ['friday', 2],
        ['saturday', 34],
        ['sunday', 25],
        ['wednesday', 45],
        ['thursday', 32],
        ['friday', 2],
        ['saturday', 34],
        ['sunday', 25]
    ]
    return(
        <div className={styles.container}>
            <div className={styles['section-1']}>
                <div className={styles['count-data']}>
                    <CountedData
                        heading='dfafddfafdfda dsaf'
                        count={0}
                        subHeading=''
                        subCount={3}
                        width='100%'
                        />
                </div>
                <div className={styles['count-data']}>
                    <CountedData
                        heading='adsf adsf fd'
                        count={0}
                        subHeading=''
                        subCount={3}
                        width='100%'
                        />
                </div>
                <div className={styles['count-data']}>
                    <CountedData
                        heading='asdf dfs'
                        count={0}
                        subHeading=''
                        subCount={3}
                        width='100%'
                        />
                </div>
            </div>
            <div className={styles['section-2']}>
                <BarChart
                    heading=''
                    chartData={chartData}
                    />
            </div>
        </div>
    )
}

export default Users;