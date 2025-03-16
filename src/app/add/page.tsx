import React, { Suspense } from 'react'

import AddMainPage from './AddMainPage';
import { findUserAction, getAllCharsAction } from '../actions/UserAction';
import { IUser } from '@/lib/models/user.interface';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import Loading from '../loading';


export default async function page() {
    //const userPromise: Promise<IUser> = findUserAction("jhbghdvnhs53");

    const chars = await getAllCharsAction()

    return (
        <div className="w-full flex flex-col items-center">
            <Suspense fallback={<Loading />}>
                <ErrorBoundary fallback={<h3>Something went wrong</h3>}>
                    <AddMainPage chars={chars} />
                </ErrorBoundary>
            </Suspense>
        </div>
    );
}
