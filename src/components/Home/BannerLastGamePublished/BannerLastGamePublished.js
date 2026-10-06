import styles from './BannerLastGamePublished.module.scss';
import {useEffect, useState} from "react";
import {getLastPublished} from "@/api";
import {Container, Image} from "semantic-ui-react";
import {fn} from "@/utils";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { Label } from '@/components/Shared'


export function BannerLastGamePublished( ) {

    const [game, setGame] = useState()

    useEffect(() => {
        (async () => {
            try {
                const response = await getLastPublished()
                setGame(response.data[0])
            } catch (error) {
                console.log(error)
            }
        })  ()
    }, []);

    if(!game) return null;

    const wallpaper = game.attributes.wallpaper.data?.attributes?.url
        || game.attributes.cover.data?.attributes?.url;
    const releaseDate = new Date(game.attributes.releaseDate).toISOString();
    const price = fn.calcDiscountedPrice( game.attributes.price, game.attributes.discount )

    return (
        <div className={styles.container}>
            <Image src={fn.resolveMediaUrl(wallpaper)} className={styles.wallpaper} />

            <Link to={`/${game.attributes.slug}`} className={styles.infoContainer} >
                <Container>
                    <span className={styles.date}> { DateTime.fromISO(releaseDate).minus({days: 1}).toRelative() } </span>
                    <h2>{game.attributes.title}</h2>
                    <p className={styles.price}>
                        <Label.Discount> -{ game.attributes.discount }% </Label.Discount>
                        <span className={styles.finalPrice}> {price} </span>
                    </p>
                </Container>
            </Link>
        </div>
    );
}



