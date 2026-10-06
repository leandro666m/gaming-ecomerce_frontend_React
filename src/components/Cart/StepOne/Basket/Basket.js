import styles from './Basket.module.scss';
import {map} from "lodash";
import {Dropdown, Icon, Image} from "semantic-ui-react";
import {ENV, fn} from "@/utils";
import {useCart} from "@/hooks";



export function Basket(props) {

    const { games } = props;
    const { changeQuantityItem, deleteItem } = useCart()

    const options = Array.from({length: 10},
        (_, i) => {
            const number = i + 1
            return {
                key: number,
                text: String(number),
                value: number
            }
        }
    )

    return (
        <div className={styles.basket}>
            <h2>Carrito</h2>

            <div className={styles.block}>
                { map(games, (game) =>(
                    <div key={game.id} className={styles.product}>
                        <Image src={`${ENV.SERVER_HOST}${game.attributes.cover.data.attributes.url}`} alt={game.name} />
                        <div>
                            <div className={styles.info}>
                                <div>
                                    <p>{game.attributes.title}</p>
                                    <p>{game.attributes.platform.data.attributes.title}</p>
                                </div>
                                <Icon name={'trash alternate outline'} link onClick={ ()=>deleteItem(game.id) }/>
                            </div>

                            <div className={styles.quantity}>
                                <Dropdown className='number'
                                          options={options}
                                          selection
                                          value={game.quantity} compact
                                          onChange={(_,data)=>{changeQuantityItem(game.id, data.value)}}/>
                                <span>${ fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount) }</span>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>

        </div>
    );
}

