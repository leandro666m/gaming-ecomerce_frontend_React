import {BasicLayout} from '@/layouts';
import {useEffect, useState} from "react";
import {useSearchParams} from 'react-router-dom';
import {Container} from "semantic-ui-react";
import {GridGames, NoResult, Pagination, Separator} from "@/components/Shared";
import {searchGames} from '@/api';




export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get('search') || '';
    const page = Number(searchParams.get('page') || 1);
    const [games, setGames] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        document.getElementById('search-games')?.focus();
    }, []);

    useEffect(() => {
        let isActive = true;
        setHasError(false);

        searchGames(searchText, page)
            .then((result) => {
                if (!isActive) return;
                setGames(result.data);
                setPagination(result.meta.pagination);
            })
            .catch(() => {
                if (isActive) setHasError(true);
            });

        return () => { isActive = false; };
    }, [searchText, page]);


    return (
        <BasicLayout relative isOpenSearch={true}>
            <Container>
                <Separator height={50} />
                <h2>Buscando: {searchText}</h2>
                {
                    hasError ? <NoResult text="No se pudieron buscar juegos." /> : games.length > 0 ? (
                        <>
                            <GridGames games={games} />
                            <Separator height={50} />
                            {pagination && <Pagination totalPages={pagination.pageCount} currentPage={pagination.page} />}
                        </>
                    ) : pagination ? <NoResult text="No se han encontrado juegos." /> : null
                }
                <Separator height={100} />
            </Container>
        </BasicLayout>
    );
}

