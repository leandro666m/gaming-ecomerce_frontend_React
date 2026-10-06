import styles from './GridGames.module.scss';
import {map} from "lodash";
import { Link } from "react-router-dom";
import {Image} from "semantic-ui-react";
import {fn} from "@/utils";
import {Label, WishlistIcon} from "@/components/Shared";



export function GridGames(props) {

    const {wishlist, onReload} = props;


    return (
        <div className={styles.gridGames}>
            {
                map(wishlist, (item) => {
                    const game = item.attributes.game.data;
                    const cover = game.attributes.cover.data?.attributes?.url;

                    return (
                        <div key={item.id} className={styles.game}>
                            <Link to={`/${game.attributes.slug}`}>
                                <div>
                                    <Image src={fn.resolveMediaUrl(cover)}/>
                                    {game.attributes.discount > 0 &&
                                        <Label.Discount className={styles.discount}>
                                            {`-${game.attributes.discount}% `}
                                        </Label.Discount>
                                    }
                                </div>

                                <div>
                                    <span>{game.attributes.title}</span>
                                    <span className={styles.price}>
                                         {new Intl.NumberFormat('es-AR', {
                                             style: 'currency',
                                             currency: 'ARS'
                                         }).format(fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount))}
                                    </span>
                                </div>
                            </Link>

                            <WishlistIcon gameId={game.id} className={styles.wishlistIcon} removeCallback={onReload} />
                        </div>
                    )
                })
            }

        </div>
    );
}

