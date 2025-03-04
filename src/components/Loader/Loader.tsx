import React from 'react'
import styles from './loader.module.css'

export default function Loader() {
    return (
        <div className='flex justify-center items-center fixed top-0 left-0 right-0 bottom-0z-50 bg-background bg-opacity-50'>
            <div className={styles.spinner}>
                <div className={styles.spinner1}></div>
            </div></div>
    )
}
