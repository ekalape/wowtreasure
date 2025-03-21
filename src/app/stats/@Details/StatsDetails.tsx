'use client'

import { parseAsString, useQueryState } from 'nuqs'
import { handleProfitData } from '../handleProfitData'
import useCharsStore from '@/store/charsStore';
import { isSameDay, parse } from 'date-fns';
import CharCardDataView from '@/components/CharCardDataView/CharCardDataView';
import { useMemo, useState } from 'react';
import { IChar } from '@/lib/models/char.interface';



export default function StatsDetails({ chars }: { chars: IChar[] }) {
    const [from] = useQueryState('from', parseAsString.withOptions({ shallow: false }));
    const [to] = useQueryState('to', parseAsString.withOptions({ shallow: false }));
    const [dayToView] = useQueryState('day', parseAsString.withOptions({ shallow: false }));

    const profits = useMemo(() => {
        if (!from || !to) return [];
        return handleProfitData(chars, parse(from, 'dd-MM-yyyy', new Date()), parse(to, 'dd-MM-yyyy', new Date()));
    }, [chars, from, to]);

    console.dir(profits)

    const profitsByChars = useMemo(() => {
        return profits.reduce((acc, pr) => {
            pr.chars.forEach(char => {
                const existingChar = acc.find(item => item.char.charid === char.charid);
                if (existingChar) {
                    existingChar.fullProfit += pr.fullProfit;
                } else {
                    acc.push({ char, fullProfit: pr.fullProfit });
                }
            });
            return acc;
        }, [] as { char: IChar, fullProfit: number }[]);
    }, [profits]);

    const profitsByDate = useMemo(() => {
        if (!dayToView) return null;
        const parsedDayToView = parse(dayToView, 'dd-MM-yyyy', new Date());
        const dd = profits.find(pr => isSameDay(parsedDayToView, pr.date.split('T')[0]));
        if (!dd) return null;


        const result: { char: IChar, dayProfit: number }[] = [];
        console.log('dd', dd)
        dd.chars.forEach(ch => {
            const dayProfit = ch.earnings
                .filter(earn => {
                    return isSameDay(parsedDayToView, earn.date.split('T')[0])
                })
                .reduce((acc, earn) => acc + earn.amount, 0);
            console.log('dayProfit', dayProfit)

            const existingChar = result.find(r => r.char.charid === ch.charid);
            if (!existingChar) {
                result.push({ char: ch, dayProfit });
            } else {
                existingChar.dayProfit += dayProfit;
                console.log('existingChar.dayProfit', existingChar.dayProfit)
            }
        });

        return result;
    }, [dayToView, profits]);

    if (!from || !to) return <div>No boundaries for details</div>;

    return (
        <div className='flex justify-around items-top'>
            <div className='flex flex-col gap-2'>
                <h3><span>Total Profit:{' '} </span><span className='highlighted font-yatra'>{profits.reduce((acc, pr) => acc + pr.fullProfit, 0)}</span></h3>
                <div className='flex flex-col gap-2'>
                    {profitsByChars.map(pr => (
                        <CharCardDataView key={pr.char.charid}
                            id={pr.char.charid}
                            charclass={pr.char.charclass}
                            fraction={pr.char.fraction}> {pr.char.name} - {pr.fullProfit}</CharCardDataView>
                    ))}

                </div>
            </div>
            {dayToView && <div className='flex flex-col gap-2'>
                <h3><span>Selected day:{' '} </span><span className='highlighted font-yatra'>{dayToView}</span></h3>
                <div className='flex flex-col gap-2'>
                    {
                        profitsByDate?.map(pr => (
                            <CharCardDataView key={pr.char.charid}
                                id={pr.char.charid}
                                charclass={pr.char.charclass}
                                fraction={pr.char.fraction}> {pr.char.name} - {pr.dayProfit}</CharCardDataView>
                        ))

                    }

                </div>

            </div>}
        </div>
    )
}
