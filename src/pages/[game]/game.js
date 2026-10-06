import {BasicLayout} from "@/layouts";
import {fn} from "@/utils";
import {Game} from "@/components/Game";
import {NoResult, Seo, Separator} from "@/components/Shared";
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getBySlug} from '@/api';


export default function GamePage() {
    const {game: slug} = useParams();
    const [game, setGame] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let isActive = true;
        setGame(null);
        setHasError(false);

        getBySlug(slug)
            .then((result) => {
                if (isActive) setGame(result);
            })
            .catch(() => {
                if (isActive) setHasError(true);
            });

        return () => { isActive = false; };
    }, [slug]);

    if (hasError) {
        return <BasicLayout><NoResult text="No se pudo cargar el juego." /></BasicLayout>;
    }
    if (!game) return null;

    const wallpaperURL = fn.resolveMediaUrl(
        game.attributes.wallpaper.data?.attributes?.url
        || game.attributes.cover.data?.attributes?.url
    );

    return (
        <>
            <Seo title={game.attributes.title} description={game.attributes.summary} />

            <BasicLayout>
                <Game.HeaderWallpaper image={wallpaperURL}/>
                <Game.Panel gameId={game.id} game={game.attributes}/>

                <Separator height={50} />

                <Game.Info game={game.attributes} />

                <Separator height={30} />

                <Game.Media video={game.attributes.video} screenshots={game.attributes.screenshots.data}/>

                <Separator height={50} />
            </BasicLayout>
        </>
    );
}

