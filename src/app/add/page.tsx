import React, { Suspense, use } from 'react'
import CharsHolder from './components/CharsHolder'



export default async function page() {


    const getallchars = await fetch('http://localhost:3000/api/chars', {
        cache: 'no-store',
    })

    const status = getallchars.status;
    const chars = await getallchars.json();


    if (status !== 200) {
        return (
            <h3>Failed to fetch data</h3>
        );
    }

    return (
        <div>
            <Suspense fallback={<h3>Loading...</h3>}>
                <CharsHolder chars={chars} />
            </Suspense>
        </div>
    )
}
