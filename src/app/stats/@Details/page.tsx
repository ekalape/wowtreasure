import { getAllCharsAction } from '@/app/actions/UserAction';
import StatsDetails from './StatsDetails';


export default async function page() {
    const chars = await getAllCharsAction();
    return (
        <StatsDetails chars={chars} />
    )
}
