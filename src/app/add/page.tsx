import React, { Suspense, use } from 'react'
import CharsHolder from './components/CharsHolder'
import { getAllChars } from '@/lib/services/chars.service';
import AddMainPage from './AddMainPage';
import { AddNewCharModal } from './components/AddNewCharModal';



export default async function page() {


    const getallchars = getAllChars("jhbghdvnhs53");



    return (
        <div className='w-full flex flex-col items-center'>
            <Suspense fallback={<h3>Loading...</h3>}>
                <AddMainPage charsPromise={getallchars} />

            </Suspense>
        </div>
    )
}
