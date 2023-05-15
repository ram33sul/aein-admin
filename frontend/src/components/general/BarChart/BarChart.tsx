import styles from './BarChart.module.css'
import { useMemo } from 'react'

type props = {
    chartData: [string, number][],
    heading: string,
    onClick?: () => void
}

function BarChart({ chartData, heading, onClick }: props){

    const largestValue = useMemo(() => {
        return chartData.reduce((acc, curr) => {
            return curr[1] > acc ? curr[1] : acc
        }, chartData[0][1])
    }, [chartData])

    const wrapperWidth = 100 / chartData.length;
    
    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.heading}>
                {heading}
            </div>
            <div className={styles["chart-container"]}>
                {
                    chartData.map((data) => {
                        const height = `${(data[1] / largestValue) * 100}%`
                        return <Chart key={data[0]} data={data} height={height} width={wrapperWidth}/>
                    })
                }
            </div>
        </div>
    )
}

type chartProps = {
    data: [string, number];
    height: string;
    width: number
}

function Chart({data, height, width}: chartProps){

    return (
        <div className={styles["chart-title-wrapper"]} style={{width: `${width - 2}%`}}>
            <div className={styles.chart} style={{height: height}}>
                <div className={styles["chart-color"]}>
                    
                </div>
            </div>
            <div className={styles["title"]}>
                <div className={styles["title-name"]}>
                    {
                        data[0]
                    }
                </div>
                <div className={styles["title-count"]}>
                    {
                        data[1]
                    }
                </div>
            </div>
        </div>
    )
}

export default BarChart;