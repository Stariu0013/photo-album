import React from 'react';

import styles from './Modal.module.css';

function Modal(props) {
    const {
        title,
        url,
        closeModal,
    } = props;

    return <div className={styles.modal}>
        <div className={styles.modalBody}>
            <h3>{title}</h3>
            <img src={url} alt={title} className={styles.img} onClick={() => closeModal()}/>
        </div>
    </div>;
}

export default Modal;
