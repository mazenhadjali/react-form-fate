/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useCallback } from 'react';

type RemoteDataStore = {
    [key: string]: any;
};

type RemoteDataContextType = {
    store: RemoteDataStore;
    setNamespaceData: (namespace: string, data: any) => void;
};

const RemoteDataContext = createContext<RemoteDataContextType | null>(null);

export const RemoteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [store, setStore] = useState<RemoteDataStore>({});

    const setNamespaceData = useCallback((namespace: string, data: any) => {
        setStore((prev) => ({
            ...prev,
            [namespace]: data,
        }));
    }, []);

    return (
        <RemoteDataContext.Provider value={{ store, setNamespaceData }}>
            {children}
        </RemoteDataContext.Provider>
    );
};

export const useRemoteDataContext = () => {
    const context = useContext(RemoteDataContext);
    if (!context) {
        throw new Error('useRemoteDataContext must be used within a RemoteDataProvider');
    }
    return context;
};
