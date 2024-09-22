import { useState } from "react";

export const useFetching = (callback) => {
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const fetching = async (...args) => {
        try {
            setLoading(true);
            await callback(...args);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }
    return [fetching, isLoading, error];
}