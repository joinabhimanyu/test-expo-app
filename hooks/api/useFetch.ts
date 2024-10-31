import { useEffect, useState } from "react"

interface RequestOptions {
    url: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: string | object,
    headers?: { [key: string]: string }
}

const makeRequest = async (req: RequestOptions) => new Promise<any>((resolve, reject) => {
    // implementation of makeRequest function
    // resolve with response data or reject with error
    fetch(req.url, {
        method: req.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...req.headers
        },
        body: req.body ? JSON.stringify(req.body) : null
    })
        .then(res => {
            if (!res.ok) {
                reject(new Error(`HTTP error! status: ${res.status}`));
            }
            resolve(res.json());
        });
});
export const useFetch = (req: RequestOptions) => {
    // implementation of useFetch hook
    // return loading, error, and data
    // remember to handle response, error, and loading states
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await makeRequest(req);
            setData(response);
            setError(false);
        } catch (error) {
            setError(true);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, fetchData };
}

// generic function typescript

interface ResponseOptions<T> {
    loading: boolean;
    error: boolean;
    data?: T;
    fetchData: () => void; // add fetchData function to the return type to allow calling it explicitly
}

export const useFetchGeneric = <T>(req: RequestOptions): ResponseOptions<T | null> => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState<T | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await makeRequest(req);
            setData(response);
            setError(false);
        } catch (error) {
            setError(true);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, fetchData };
};