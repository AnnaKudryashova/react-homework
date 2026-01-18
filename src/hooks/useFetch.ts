import { useEffect, useState, useCallback } from 'react';

interface LogEntry<T> {
    timestamp: string;
    type: 'success' | 'error';
    url: string;
    status: number;
    response: T | null;
}

const saveLog = <T>(entry: LogEntry<T>) => {
    try {
        const logs: LogEntry<T>[] =
            JSON.parse(localStorage.getItem('apiResponseLogs') || '[]') || [];
        logs.push(entry);
        localStorage.setItem('apiResponseLogs', JSON.stringify(logs));
    } catch (error) {
        console.error('Failed to save logs to localStorage:', error);
    }
};

const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<unknown>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<number | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        const timestamp = new Date().toISOString();

        try {
            const response = await fetch(url);
            const statusCode = response.status;
            setStatus(statusCode);

            const responseBody: T | null = response.ok
                ? await response.json()
                : null;

            saveLog<T>({
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
