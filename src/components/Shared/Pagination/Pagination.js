import styles from './Pagination.module.scss';
import { Pagination as PaginationSU } from 'semantic-ui-react'
import { useSearchParams } from 'react-router-dom';


export function Pagination(props) {

    const { totalPages, currentPage } = props;
    const [searchParams, setSearchParams] = useSearchParams();

    const onPageChange = (_, data) => {
         const { activePage } = data;
         const nextParams = new URLSearchParams(searchParams);
         nextParams.set('page', activePage);
         setSearchParams(nextParams, { replace: true });
    }

    return (
        <div className={styles.container}>
            <PaginationSU defaultActivePage={currentPage} totalPages={totalPages} ellipsisItem={null} firstItem={null} lastItem={null} onPageChange={onPageChange} />
        </div>
    );
}

