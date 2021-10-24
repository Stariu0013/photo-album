import React from 'react';
import loader from '../../../assets/loader.svg';

import styles from './Loader.module.css';

function Loader() {
    return <div className={styles.container}>
        <img src={loader} alt="loader"/>
    </div>;
}

export default Loader;
