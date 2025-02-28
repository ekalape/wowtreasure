import React, { Suspense } from 'react'

import AddMainPage from './AddMainPage';
import { findUserAction } from '../actions/UserAction';
import { IUser } from '@/lib/models/user.interface';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';


export default async function page() {
    const userPromise: Promise<IUser> = findUserAction("jhbghdvnhs53");
    return (
        <div className="w-full flex flex-col items-center">
            <Suspense fallback={<h3>Loading...</h3>}>
                <ErrorBoundary fallback={<h3>Something went wrong</h3>}>
                    <AddMainPage userPromise={userPromise} />
                </ErrorBoundary>
            </Suspense>
        </div>
    );
}
