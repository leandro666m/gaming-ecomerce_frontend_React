import { useState, useEffect } from "react";
import styles from './Menu.module.scss'
import { map } from 'lodash'
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Image, Icon, Input } from "semantic-ui-react";
import {getAllPlatform} from "@/api";
import classNames from "classnames";
import {fn} from "@/utils";


export function Menu( props ) {

    const { isOpenSearch } = props
    const [platforms, setPlatforms] = useState(null)
    const [showSearch, setShowSearch] = useState(isOpenSearch)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const searchText = searchParams.get('search') || ''

    const openCloseSearch = () => {
        setShowSearch((prev) => !prev)
    }

    useEffect(() => {
        if (showSearch) {
            document.getElementById('search-games').focus()
        }
    }, [showSearch]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getAllPlatform()
                setPlatforms(response.data)
            }catch (e) {
                console.log('Error: ', e)
            }
        } ) ()
    }, [])

    const onSearch = (text) => {
        const nextParams = new URLSearchParams(searchParams)
        nextParams.set('search', text)
        nextParams.delete('page')
        navigate({ pathname: '/search', search: nextParams.toString() }, { replace: true })
    }


    return (
        <div className={styles.platform}>
            {
                map(platforms, (platform) => (
                 <Link key={platform.id} to={`/games/${platform.attributes.slug}`} >
                    <Image src={fn.resolveMediaUrl(platform.attributes.icon.data?.attributes?.url)} />
                     { platform.attributes.title }
                 </Link>
                ) )
            }

            <button className={styles.search} onClick={ openCloseSearch  } >
                <Icon name='search' />
            </button>

            <div className={classNames(styles.inputContainer, { [styles.active]: showSearch, } ) }>
                <Input id='search-games' value={searchText} placeholder='Buscador' className={styles.input} focus={true} onChange={ (_,data)=> onSearch(data.value) } />
                <Icon name='close' className={styles.closeInput} onClick={ openCloseSearch } />
            </div>
        </div>
    )
}
