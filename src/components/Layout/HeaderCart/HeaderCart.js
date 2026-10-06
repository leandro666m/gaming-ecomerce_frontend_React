import styles from './HeaderCart.module.scss';
import { Link, useSearchParams } from "react-router-dom";
import {map} from "lodash";
import classNames from "classnames";
import {Icon, Image} from "semantic-ui-react";



const steps = [
    { number: 1, title: "Carrito" },
    { number: 2, title: "Pago" },
    { number: 3, title: "Confirmación" },
];

export function HeaderCart() {

    const [searchParams] = useSearchParams()
    const currentStep = searchParams.get('step') || 1;


    return (
        <div className={styles.headerCart}>
            <div className={styles.left}>
                <Link to="/">
                    <Image src="/images/logo.png" alt="Gaming"/>
                </Link>
            </div>

            <div className={styles.center}>
                {map(steps, (step) => (
                    <div key={step.number} className={ classNames({
                        [styles.active]: step.number === Number(currentStep),
                        [styles.success]: step.number < Number(currentStep)
                    } ) }>
                        <span className={styles.number}>
                          <Icon name="check" />
                            {step.number}
                        </span>

                        <span>{step.title}</span>
                        <span className={styles.space} />
                    </div>
                    )) }
            </div>


            <div className={styles.right}>
                <Icon name="lock" />
                <div>
                    <span>Pago seguro</span>
                    <span>256-bit SSL Secure</span>
                </div>
            </div>
        </div>
    );
}


