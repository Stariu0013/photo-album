import React, {useEffect, useState} from 'react';
import {fetchData} from "../../data/fetchData";
import Photo from "./Photo";
import Pagination from "../common/Pagination/Pagination";

import styles from './Photos.module.css';
import Select from "../Select/Select";
import Loader from "../common/Loader/Loader";

function Photos() {
    const PHOTOS_PER_PAGE = 9;

    const [photosState, setPhotosState] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalAlbumId, setTotalAlbumId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const lastPhotoIndex = currentPage * PHOTOS_PER_PAGE;
    const firstPhotoIndex = lastPhotoIndex - PHOTOS_PER_PAGE;
    const [currentPhotoAlbum, setCurrentPhotoAlbum] = useState([]);

    const removePage = () => setCurrentPhotoAlbum(prevValue => prevValue.filter(page => page.isRemoved === false));
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const sortByAlbumId = (albumId) => {
        // Мне это решение не нравится, так как оно бьёт по производительности, пытался сделать черзе метод строки localeCompare, но не получилось
        const filteredData = photosState.filter(album => album.albumId === +albumId);
        const itemsNotInRange = photosState.filter(elem => elem.albumId !== albumId);

        setPhotosState(() => [...filteredData, ...itemsNotInRange]);
    };

    useEffect(() => {
        setIsLoading(true);
        fetchData()
            .then(photosData => {
                const albumIds = {};
                photosData.forEach(photoElement => {
                    photoElement.isRemoved = false;

                    albumIds[photoElement.albumId] = photoElement.albumId;
                });

                setTotalAlbumId(albumIds);
                setPhotosState(photosData);

                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        setCurrentPhotoAlbum(() => {
            return photosState.slice(firstPhotoIndex, lastPhotoIndex);
        });
    }, [photosState, firstPhotoIndex, lastPhotoIndex]);

    const photosAlbum = currentPhotoAlbum
        .map(photoData => {
            return <Photo photoData={photoData} key={photoData.id} removePage={removePage}/>;
        })
    ;

    return <>
        {
            isLoading
                ? <Loader />
                : <>
                    <Pagination totalItemsCount={photosState.length} onPageChange={paginate}/>
                    <Select totalIdsCount={totalAlbumId} sortByAlbumId={sortByAlbumId}/>

                    <div className={styles.mainContent}>
                        {photosAlbum}
                    </div>
                </>
        }
    </>;
}

export default Photos;
