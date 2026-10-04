"use client";
import { Provider } from 'react-redux';
import { store } from '../app/store' // Adjust path to your store
import { ReactNode } from 'react';

export function ReduxProviderWrapper({ children }: { children: ReactNode }) { 
    return <Provider store={store}>{children}</Provider>;
}

