/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { useRemoteDataContext } from './remoteDataContext';

function areDepsEqual(a: any[], b: any[]) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => Object.is(val, b[i]));
}

export function useRemoteData<T>(namespace: string, callback: () => Promise<T> | T, dependencies: any[] = []
) {
    const { store, setNamespaceData } = useRemoteDataContext();
    const [data, setData] = useState<T | undefined>(() => store[namespace]);
    const isMounted = useRef(true);
    const lastDeps = useRef<any[]>(dependencies);

    const fetchData = async () => {
        try {
            const result = await callback();
            if (isMounted.current) {
                setNamespaceData(namespace, result);
                setData(result);
            }
        } catch (error) {
            console.error(`Error fetching remote data for ${namespace}:`, error);
        }
    };

    useEffect(() => {
        isMounted.current = true;
        fetchData();
        lastDeps.current = dependencies;

        return () => {
            isMounted.current = false;
        };
    }, dependencies);

    const updateData = (newValue: T) => {
        setNamespaceData(namespace, newValue);
        setData(newValue);
    };

    const recheck = async (newDependencies?: any[]) => {
        const depsToCheck = newDependencies ?? dependencies;
        if (!areDepsEqual(depsToCheck, lastDeps.current)) {
            await fetchData();
            lastDeps.current = depsToCheck;
        }
    };

    useEffect(() => {
        setData(store[namespace]);
    }, [store[namespace]]); // react to external updates

    return { data, setData: updateData, recheck };
}
