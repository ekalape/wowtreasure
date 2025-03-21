
import TwoDateChooser from '@/components/DateChooser/TwoDatesChooser'
import { NuqsAdapter } from 'nuqs/adapters/next'
import React from 'react'

type LayoutProps = {
    children: React.ReactNode
    CalendarChooser: React.ReactNode
    Details: React.ReactNode
}

export default function Layout({ children, CalendarChooser, Details }: LayoutProps) {
    const charName = 'charName'
    return (
        <NuqsAdapter>
            <div className='w-full h-full grid grid-cols-[1fr_2fr] gap-3 justify-items-center m-auto justify-center'>

                <section className='w-1/2 border-2 border-background_alt p-4 rounded-lg col-span-2 items-center flex justify-center'>
                    <TwoDateChooser />
                </section>

                <section className='w-full border-2 border-background_alt p-4 rounded-lg flex flex-col items-center justify-center'>
                    {CalendarChooser}
                </section>

                <section className='w-full border-2 border-background_alt p-4 rounded-lg flex flex-col justify-start'>
                    {Details}
                </section>

                <section className='w-1/2 border-2 flex border-background_alt p-4 rounded-lg col-span-2 justify-center items-center'>
                    {children}
                </section>
            </div>
        </NuqsAdapter>
    )
}
