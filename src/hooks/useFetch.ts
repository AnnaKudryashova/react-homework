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
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState<number | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        const timestamp = new Date().toISOString();

        try {
            const response = await fetch(url);
            const statusCode = response.status;
            setStatus(statusCode);

            if (!response.ok) {
                throw new Error(`HTTP ${statusCode}`);
            }

            const responseBody: T = await (response.json() as Promise<T>);

            saveLog({
                timestamp,
                type: 'success' as const,
                url,
                status: statusCode,
                response: responseBody,
            });

            setData(responseBody);
        } catch (err) {
            const error = err as Error;
            saveLog({
                timestamp,
                type: 'error' as const,
                url,
                status: status || 0,
                response: null,
            });
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [url]);

    return { data, error, isLoading, status, refetch: fetchData };
};

export default useFetch;
