export function fetchData() {
    return fetch('http://jsonplaceholder.typicode.com/photos')
        .then(photosData => photosData.json());
}
