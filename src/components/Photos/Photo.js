import React, {useState} from 'react';
import Modal from "../common/Modal/Modal";

import styles from './Photo.module.css';

function Photo(props) {
    const {
        id,
        albumId,
        thumbnailUrl,
        title,
        url,
    } = props.photoData;

    const {
        removePage,
    } = props;

    const [showModal, setShowModal] = useState(false);

    return <div className={styles.photoItem}>
        { showModal && <Modal title={title} url={url} closeModal={() => setShowModal(false)}/>}
        <p className={styles.photoTitle}>Album id: {albumId}</p>
        <img src={thumbnailUrl} alt={title} id={id} data-albumid={albumId} onClick={() => setShowModal(prevState => !prevState)}/>
        <p className={styles.photoContent}>{title}</p>
        <button className={styles.removeBtn} onClick={() => {
            props.photoData.isRemoved = true;

            removePage();
        }
        }>remove page</button>
    </div>;
}

export default Photo;
