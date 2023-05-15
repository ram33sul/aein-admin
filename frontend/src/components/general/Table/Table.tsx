import { Keyable } from '../../../types/object';
import styles from './Table.module.css';


type Headings = string[];
type Datas = Keyable[];

interface Props {
    datas: Datas;
    headings: Headings;
}
function Table({datas, headings}: Props) {

    return (
        <div className={styles.table}>
            <div className={styles.tr}>
                {
                    headings.map(heading => {
                        return(
                            <div key={heading} className={styles.th} style={{width: `${100/headings.length}%` }}>
                                {heading}
                            </div>
                        )
                    })
                }
            </div>
            {
                datas.map(list => {
                    return(
                        <div key={list[headings[0]]} className={styles.tr} onClick={list.onClick}>
                            {
                                headings.map(heading => {
                                    
                                    return (
                                        <div key={list[heading]} className={styles.tb} style={{width: `${100/headings.length}%`, color: list.rowColor }}>
                                            {list[heading]}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}


export default Table;