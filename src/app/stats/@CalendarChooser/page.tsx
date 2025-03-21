import { SearchParamsType } from '@/lib/models/StatisticsSearchParams';
import React from 'react'
import StatsCalendar from './StatsCalendar';
import { getAllCharsAction } from '@/app/actions/UserAction';



export default async function CalendarPage() {
    const chars = (await getAllCharsAction());

    return (
        <div> <StatsCalendar chars={chars || []} /></ div>
    )
}
