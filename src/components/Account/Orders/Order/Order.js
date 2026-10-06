import styles from './order.module.scss'
import { useState } from "react";
import { map } from "lodash";
import { BasicModal } from "@/components/Shared";
import { DateTime } from 'luxon'
import {fn} from "@/utils";
import {Image} from "semantic-ui-react";



export function Order(props) {

    const { order } = props
    const formattedTotalPayment = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(order.attributes.totalPayment)
    const products = order.attributes.products
    const totalProducts = products.reduce( (total, product) => total + product.quantity, 0 );
    const address = order.attributes.addressShipping

    const [showModal, setShowModal] = useState(false)
    const openCloseModal = () => setShowModal((prevState) => !prevState);


    return (
        <>
            <div className={styles.order} onClick={openCloseModal}>
                <div>
                    <span> { order.attributes.createdAt
                        ? DateTime.fromISO(order.attributes.createdAt, { locale: 'es' }).toFormat('dd/MM/yyyy')
                        : `Pedido #${order.id}` } </span>
                    <p> {totalProducts} { totalProducts === 1 ? `producto` : `productos` } </p>
                </div>


                <p> { formattedTotalPayment } </p>
            </div>

            <BasicModal show={showModal} onClose={openCloseModal} title="Información del pedido" >
                { map(products, (product) => (
                    <div className={styles.product} key={product.id}>
                        <Image src={fn.resolveMediaUrl(product.attributes.cover.data?.attributes?.url)} />

                        <div>
                            <div className={styles.info}>
                                <div>
                                    <p> { product.attributes.title } </p>
                                    <p> { product.attributes.platform.data.attributes.title }</p>
                                </div>
                            </div>
                            <div className={styles.quantity}>
                                <span> x{product.quantity} </span>
                                <span> { new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format( fn.calcDiscountedPrice(product.attributes.price, product.attributes.discount ) ) } </span>
                            </div>

                        </div>
                    </div>
                    ))
                }

                <div className={styles.address}>
                    <div>
                        <p className={styles.title}> {address.attributes.title} </p>
                        <p className={styles.addressInfo}> {address.attributes.name}, {address.attributes.address}, {' '}
                            {address.attributes.state}, {address.attributes.city}, {' '}
                            {address.attributes.postal_code}
                        </p>
                    </div>
                </div>

                <div className={styles.total}>
                    <p>Total: {  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(order.attributes.totalPayment) }</p>
                </div>

            </BasicModal>

        </>

    );
}

