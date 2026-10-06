import styles from './StepTwo.module.scss';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import {Separator} from "@/components/Shared";
import {Addresses} from "@/components/Cart/StepTwo/Addresses";
import {useState} from "react";
import {Payment} from "@/components/Cart/StepTwo/Payment";
import {Resume} from "@/components/Cart/StepTwo/Resume";


const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripeInit = stripePublishableKey ? loadStripe(stripePublishableKey) : Promise.resolve(null);

export function StepTwo(props) {

    const { games } = props;
    const [addressesSelected, setAddressesSelected] = useState(null)

    return (
        <Elements stripe={stripeInit}>
            <div className={styles.stepTwo}>
                <div className={styles.center}>
                    <Addresses addressesSelected={addressesSelected} setAddressesSelected={setAddressesSelected} />
                    <Separator height={30} />
                    {
                        addressesSelected && <Payment available={Boolean(stripePublishableKey)} />
                    }
                </div>

                <div className={styles.right}>
                    <Resume games={games} addressesSelected={addressesSelected} stripeAvailable={Boolean(stripePublishableKey)} />
                </div>
            </div>
        </Elements>
    );
}

