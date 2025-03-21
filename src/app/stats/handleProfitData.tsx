import { IChar } from '@/lib/models/char.interface';
import { getAllCharsAction } from '../actions/UserAction';

export function handleProfitData(chars: IChar[], from: Date, to: Date) {

    const profits = chars.map(char => ({
        ...char,
        earnings: char.earnings.filter(earning =>
            new Date(earning.date) >= from && new Date(earning.date) <= to
        )
    }));


    const result = Object.values(profits.reduce((acc, char) => {
        char.earnings.forEach(earning => {
            const earningDate = earning.date.split('T')[0];

            if (new Date(earningDate) >= from && new Date(earningDate) <= to) {
                if (!acc[earningDate]) {
                    acc[earningDate] = { date: earningDate, chars: [], fullProfit: 0 };
                }
                acc[earningDate].chars.push(char);
                acc[earningDate].fullProfit += earning.amount;
            }
        });
        return acc;
    }, {} as Record<string, { date: string; chars: IChar[]; fullProfit: number }>)
    );
    return result;


}