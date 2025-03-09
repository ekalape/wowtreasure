"use client";

import { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }


    render() {
        if (this.state.hasError) {
            return (
                <div className='flex flex-col items-center fixed top-0 left-0 w-full h-full bg-primary/30 z-50 text-2xl'>
                    {this.props.fallback}
                    <h3 className='text-2xl '>Error: {this.state.error?.message}</h3>
                </div>
            );
        }
        return this.props.children;
    }
}