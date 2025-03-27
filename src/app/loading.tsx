import Loader from '@/components/Loader/Loader'
import React from 'react'

export default function Loading() {
    console.log("Loading is called")
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-background opacity-80 backdrop-blur-md z-50'>

            <Loader />
        </div>
    )
}
