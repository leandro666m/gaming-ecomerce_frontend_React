import styles from './Addresses.module.scss';
import { getAddressById } from '@/api'
import {useEffect, useState} from "react";
import {useAuth} from "@/hooks";
import {map} from "lodash";
import classNames from "classnames";


export function Addresses(props) {

    const { addressesSelected, setAddressesSelected } = props;
    const [addresses, setAddresses] = useState( null )
    const { user } = useAuth()

    useEffect(() => {
        (async () => {
            try {
                const response = await getAddressById(user.id)
                setAddresses(response.data)
            } catch (e) {
                console.error("💥Addresses: ", e);
            }
        })()
    }, [user?.id]);


    return (
        <div className={styles.addresses}>
            <h2>Dirección</h2>

            { map( addresses, (address) => (
                <div key={address.id} onClick={ ()=> setAddressesSelected(address) }
                     className={classNames(styles.address, {  [styles.active]: address.id === addressesSelected?.id  })} >
                    <p>{address.attributes.name} ( {address.attributes.title} )</p>
                    <p>{address.attributes.address} {' - '} C.P:{' '}{address.attributes.postal_code}, {' '} {address.attributes.city}, {' '} {address.attributes.state}  </p>
                </div>
                ) )

            }

        </div>
    );
}

