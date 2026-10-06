import styles from './Resume.module.scss'
import {useEffect, useState} from "react";
import {forEach} from "lodash";
import {fn} from "@/utils";
import {Button} from "semantic-ui-react";
import { Link, useSearchParams } from "react-router-dom";
import {Separator} from "@/components/Shared";



export function Resume(props) {

    const { games } = props;
    const [totals, setTotals] = useState(null)
    const [, setSearchParams] = useSearchParams()

    useEffect(() => {
        let totals = {
            original: 0,
            discount: 0,
            price: 0
        }

        forEach(games, game => {
            const price = fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount)
            totals = {
                original: totals.original + game.attributes.price * game.quantity,
                discount: totals.discount + (game.attributes.price - price) * game.quantity,
                price: totals.price + price * game.quantity
            }
        })
      setTotals(totals)
    }, [games]);

    const goToStepTwo = () => {
        setSearchParams((currentParams) => {
            const nextParams = new URLSearchParams(currentParams)
            nextParams.set('step', '2')
            return nextParams
        }, { replace: true })
    }

    if(!totals) return null


    return (
        <div className={styles.resume}>
            <h2>Resúmen</h2>

            <div className={styles.block}>
                <div className={styles.prices}>
                    <div>
                        <span>Precio:</span>
                        <span>${totals.original.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Descuento:</span>
                        <span>${totals.discount.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Subtotal</span>
                        <span>${totals.price.toFixed(2)}</span>
                    </div>
                </div>

            <Separator height={20}/>
            <Button primary fluid onClick={goToStepTwo}>Continuar</Button>
            <Separator height={5}/>
            <Link to={'/'}>Seguir comprando</Link>
            </div>
        </div>
    );
}

