import {useState, useEffect} from 'react';
import { getLatestPublished } from '@/api';
import {GridGames} from "@/components/Shared";


export function LatestGames(props) {

    const { title,limit,platformId } = props;
    const [games, setGames] = useState(null)

    useEffect(() => {
        ( async () => {
                try {
                    const response = await getLatestPublished( limit, platformId );
                    setGames(response.data)
                }catch (error) {
                    console.log(error)
                }
            }

        )()

    }, [limit, platformId] )

    if (!games) return null;

    return (
        <div>
            <h2>{title}</h2>

            <GridGames games={games} />
        </div>
    );
}

