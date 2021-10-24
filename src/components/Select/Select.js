import React from 'react';

import styles from './Select.module.css';

function Select(props) {
    const {
        totalIdsCount,
        sortByAlbumId,
    } = props;

    return <select className={styles.select} defaultValue="Выберите альбом" onChange={(value) => sortByAlbumId(Number(value.target.value))}>
        <option value="Выберите альбом" className={styles.option} disabled hidden>Выберите альбом</option>
        {
            Object.values(totalIdsCount).map(id => {
                return <option className={styles.option} value={id} key={id}>{id}</option>
            })
        }
    </select>;
}

export default Select;
