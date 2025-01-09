import React from 'react'

export default function SlopeDivider({ fillColor }: { fillColor?: string }) {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill={fillColor}><path d="M0 0v100S500 4 1000 4V0H0Z">
            </path>
            </svg>
        </>
    )
}
