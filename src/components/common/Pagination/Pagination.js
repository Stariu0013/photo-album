import React, {useState} from 'react';

import styles from './Pagination.module.css';

function Pagination(props) {
    const {
        totalItemsCount,
        pageSize = 9,
        portionSize = 5,
        onPageChange,
    } = props;
    const totalPagesCount = Math.ceil(totalItemsCount / pageSize);
    const pages = [];

    for (let i = 0 ; i < totalPagesCount ; i++) {
        pages.push(i + 1);
    }

    const portionCount = Math.ceil(totalPagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    let leftPortionNumberPage = (portionNumber - 1) * portionSize;
    let rightPortionNumberPage = portionNumber * portionSize;

    return <div className={styles.container}>
        <div>
            {
                portionNumber > 1
                && <button className={styles.btn} onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>
            }
        </div>

        <div>
            {
                pages
                    .filter(p => p >= leftPortionNumberPage && p <= rightPortionNumberPage)
                    .map(page => {
                        return  <span key={page}><a className={styles.pageLink} href="#" onClick={() => onPageChange(page)}>{page}</a></span>;
                    })
            }
        </div>

        <div>
            {
                portionCount >portionNumber
                && <button className={styles.btn} onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>
            }
        </div>
    </div>;
}

export default Pagination;
