import { useState, useEffect } from 'react';

const useFetch = (url: string) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((apiData) => setData(apiData));
    }, [url]);

    return [data];
};

export default useFetch;
