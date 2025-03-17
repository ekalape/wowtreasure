import React from 'react'

export default async function CalendarPage({ params }: { params: Promise<{ charName: string }> }) {
    const { charName } = await params;
    return (
        <div>Calendar + {charName}</div>
    )
}
