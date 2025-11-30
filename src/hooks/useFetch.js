import { useEffect, useState, useCallback } from 'react';

const saveLog = (entry) => {
    try {
        const logs = JSON.parse(localStorage.getItem('apiResponseLogs')) || [];
        logs.push(entry);
        localStorage.setItem('apiResponseLogs', JSON.stringify(logs));
    } catch (error) {
        console.error('Failed to save logs to localStorage:', error);
    }
};

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        const timestamp = new Date().toISOString();

        try {
            const response = await fetch(url);
            const statusCode = response.status;
            setStatus(statusCode);

            const responseBody = response.ok ? await response.json() : null;

            saveLog({
                timestamp,
                type: response.ok ? 'success' : 'error',
                url,
                status: statusCode,
                response: responseBody,
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${statusCode}`);
            }

            setData(responseBody);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, error, isLoading, status };
};

export default useFetch;
