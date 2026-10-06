import styles from './Resume.module.scss';
import {useEffect, useState} from "react";
import {fn} from "@/utils";
import {forEach, map} from "lodash";
import {Button, Message} from "semantic-ui-react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '@/hooks'
import {completeCheckout, createPaymentIntent} from '@/api'
import { useSearchParams } from 'react-router-dom'



export function Resume(props) {

    const { games, addressesSelected, stripeAvailable } = props;
    const [total, setTotal] = useState(null)
    const [loading, setLoading] = useState(false)
    const [paymentError, setPaymentError] = useState('')
    const [confirmedPaymentId, setConfirmedPaymentId] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const [, setSearchParams] = useSearchParams()
    const { deleteAllItems } = useCart()


    useEffect(() => {
        let totalTemp = 0

        forEach(games, (game) => {
            const price = fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount)
            totalTemp += price * game.quantity
        })

        setTotal(totalTemp.toFixed(2))

    }, [games]);

    const onPay = async () => {
        setLoading(true)
        setPaymentError('')

        try {
            if (!stripeAvailable || !stripe || !elements) {
                throw new Error('El pago no está configurado en este entorno.');
            }

            let paymentIntentId = confirmedPaymentId;
            if (!paymentIntentId) {
                const cardElement = elements.getElement(CardElement);
                const intent = await createPaymentIntent(games);
                const result = await stripe.confirmCardPayment(intent.clientSecret, {
                    payment_method: { card: cardElement },
                });
                if (result.error) throw new Error(result.error.message);
                if (result.paymentIntent?.status !== 'succeeded') {
                    throw new Error('El proveedor no confirmó el pago.');
                }
                paymentIntentId = result.paymentIntent.id;
                setConfirmedPaymentId(paymentIntentId);
            }

            await completeCheckout(paymentIntentId, addressesSelected.id, games);
            deleteAllItems()
            goToStepEnd()
        } catch (error) {
            setPaymentError(error.message || 'No se pudo completar el pago.');
        } finally {
            setLoading(false)
        }
    }

    const goToStepEnd = () => {
        setSearchParams((currentParams) => {
            const nextParams = new URLSearchParams(currentParams)
            nextParams.set('step', '3')
            return nextParams
        }, { replace: true })
    }


    if(!total) return null

    return (
        <div className={styles.resume}>
            <h2>Resúmen</h2>

            <div className={styles.block}>
                <div className={styles.products}>
                    { map(games, (game) => (
                        <div key={game.id} className={styles.product}>
                            <div>
                                <p>{game.attributes.title}</p>
                                <span>{game.attributes.platform.data.attributes.title}</span>
                            </div>
                            <span> {game.quantity > 0 && `${game.quantity}x`} ${ fn.calcDiscountedPrice(game.attributes.price, game.attributes.discount) } </span>
                        </div>
                        ))
                    }
                </div>
            </div>

            <div className={styles.blockTotal}>
                <div>
                    <span>Total: </span>
                    <span>${total}</span>
                </div>
                {paymentError && <Message error content={paymentError} />}
                <Button primary fluid disabled={!addressesSelected || !stripeAvailable || loading} onClick={onPay} loading={loading}>Pagar</Button>
            </div>
        </div>

    );
}

