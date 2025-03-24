import React from 'react'
import styles from './loader.module.css'

export default function Loader() {
    return (
        <div className='flex justify-center items-center absolute top-1/2 left-1/2 bg-background/30'>
            <div className={styles.spinner}>
                <div className={styles.spinner1}></div>
            </div></div>
    )
}
