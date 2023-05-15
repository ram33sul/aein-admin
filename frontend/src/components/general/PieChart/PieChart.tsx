import styles from './PieChart.module.css';

type props = {
    data: {
        name: string,
        color: string,
        count: number
    }[];
    heading: string,
    height: string,
    onClick?: () => void
}
function PieChart({data, heading, height, onClick}: props){

    const sumValue = data.reduce((acc, curr) => {
        return curr.count + acc;
    },0)


    const pieData = () => {
        let i = 0;
        return data.map(elem => {
            const { color, count} = elem;
            const value = (count / sumValue) * 360
            const deg = value + i
            i += value;
            return `${color} 0 ${deg}deg`
        })
    }

    const backgroundImage = `conic-gradient(${pieData()})`
    
    return (
        <div className={styles.container} style={{height}} onClick={onClick}>
            <div className={styles.heading}>
                {heading}
            </div>
            <div className={styles['chart']}  style={{backgroundImage: backgroundImage}}>

            </div>
            <div className={styles["bullets-wrapper"]}>
                {
                    data.map(elem => {
                        const { color, name } = elem;
                        return (
                            <div className={styles["bullet-text-wrapper"]} key={name}>
                                <div className={styles["bullet"]} style={{backgroundColor: color}}>
                                </div>
                                <div className={styles["text"]}>
                                    {name}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PieChart;