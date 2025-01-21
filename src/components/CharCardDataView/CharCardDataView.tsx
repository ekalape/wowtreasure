import { getClassColor } from '@/lib/charClass-color';
import alliance_img from '@/assets/aliance-icon.png';
import horde_img from '@/assets/horde-icon.png';
import React, { useState } from 'react'

type CharCardDataViewProps = {
    id: string,
    charclass: string,
    fraction: string,
    children: React.ReactNode
}


export default function CharCardDataViewByChar({ charclass, fraction, children }: CharCardDataViewProps) {

    const classColor = getClassColor(charclass);



    return (
        <div
            className='flex gap-3 border-1 rounded-xl px-3 py-1 items-center cursor-pointer'
            style={{
                borderColor: classColor,
                backgroundColor: `${classColor}4D`,
            }}
        >
            <img
                src={fraction === 'horde' ? horde_img.src : alliance_img.src}
                className='w-4 h-4 '
            />
            {children}
        </div>
    )
}

