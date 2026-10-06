import { Container } from 'semantic-ui-react';
import {useEffect, useState} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {getGamesByPlatformSlug, getPlatformBySlug} from '@/api';
import {BasicLayout} from "@/layouts";
import {GridGames, NoResult, Pagination, Seo, Separator} from "@/components/Shared";



export default function PlatformPage() {
    const {platform: slug} = useParams();
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') || 1);
    const [games, setGames] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [platform, setPlatform] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let isActive = true;
        setHasError(false);

        Promise.all([getPlatformBySlug(slug), getGamesByPlatformSlug(slug, page)])
            .then(([platformResult, gamesResult]) => {
                if (!isActive) return;
                setPlatform(platformResult);
                setGames(gamesResult.data);
                setPagination(gamesResult.meta.pagination);
            })
            .catch(() => {
                if (isActive) setHasError(true);
            });

        return () => { isActive = false; };
    }, [slug, page]);

    if (hasError) {
        return <BasicLayout><NoResult text="No se pudo cargar esta categoría." /></BasicLayout>;
    }
    if (!platform || !pagination) return null;

    return (
        <>
            <Seo title={ `Juegos de ${platform.attributes.title}` } />
        <BasicLayout relative>
            <Container>
                <Separator height={50} />

                <h2>{ platform.attributes.title }</h2>
                { games.length > 0 ? (
                    <div>
                        <GridGames games={games} />
                        <Separator height={30} />
                        <Pagination totalPages={pagination.pageCount} currentPage={pagination.page} />
                    </div>
                ) : (
                    <NoResult text={`La categoria ${ platform.attributes.title } aún no tiene productos.`}/>
                ) }

                <Separator height={100} />

            </Container>
        </BasicLayout>
        </>
    );
}

